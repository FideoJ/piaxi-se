const srt = require("subtitle");
const path = require('path');
const { sendData, AppError, pick, keyOfTask } = require('../utils');
const Works = require('../models/works');
const request = require('request-promise-native');
const { filer } = require('../config');
const { RedisClientManager } = require('../services/redis');

const manager = new RedisClientManager();
const client = manager.getClient(1);

exports.retrieveAll = async (ctx) => {
  const { curUser: { openid } } = ctx.session;
  const works = await Works.retrieveAll(openid);
  return sendData(ctx, { works }, 'OK', '获取当前用户的works列表成功');
};

exports.createOneWorks = async (ctx) => {
  const { body: { video_id } } = ctx.paramData;
  const { curUser: { openid } } = ctx.session;
  const { insertId } = await Works.createOneWorks(video_id, openid);
  return sendData(ctx, { works_id: insertId }, 'OK', '新建作品成功');
}

exports.parseOneWorks = async (ctx, next, works_id) => {
  const { curUser: { openid } } = ctx.session;
  const [works] = await Works.retrieveOne(works_id, openid);
  if (!works) {
    throw new AppError.SoftError(AppError.NOT_FOUND, `works${works_id}不存在或无权访问`);
  }
  ctx.paramData.works = works;
  return next();
};

exports.uploadSubtitle = async (ctx) => {
  const { body: { subtitle }, works: { works_id } } = ctx.paramData;
  const srtPath = filer.url + path.join('/works', `${works_id}`, 'subtitle.srt');
  const srtFile = srt.stringify(subtitle);
  const option = {
    method: 'POST',
    uri: srtPath,
    formData: {
      file: srtFile,
    },
  };
  await request(option);
  return sendData(ctx, {}, 'OK', '字幕上传成功');
};

const startTask = async (works_id, video_id, type, extra) => {
  const state = 'ready';
  const created_at = Date.now();
  const task = {
    works_id,
    video_id,
    type,
    extra,
    state,
    created_at,
  };
  await client.setAsync(keyOfTask(works_id, type), JSON.stringify(task));
  return { state, created_at };
};

exports.startFaceReplacing = async (ctx) => {
  const { body: { role_id }, works: { works_id, video_id } } = ctx.paramData;
  const task = await startTask(works_id, video_id, 'face', { role_id });
  return sendData(ctx, task, 'OK', '人脸替换任务提交成功'); 
};

exports.startDubbing = async (ctx) => {
  const { body: { bgm_id }, works: { works_id, video_id } } = ctx.paramData;
  const task = await startTask(works_id, video_id, 'dub', { bgm_id });
  return sendData(ctx, task, 'OK', '配音任务提交成功'); 
};

exports.queryProgress = async (ctx) => {
  const { works: { works_id } } = ctx.paramData;

  const tasksInfo = await Promise.all([
    client.getAsync(keyOfTask(works_id, 'face')),
    client.getAsync(keyOfTask(works_id, 'dub')),
  ]);

  const tasks = [];
  for (const taskInfo of tasksInfo) {
    tasks.push(pick(JSON.parse(taskInfo), 'type', 'state', 'created_at'));
  }
  return sendData(ctx, { tasks }, 'OK', '任务进度查询成功'); 
};
