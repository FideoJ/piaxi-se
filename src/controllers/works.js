const { sendData, AppError } = require('../utils');
const Works = require('../models/works');

exports.retrieveAll = async (ctx) => {
  const { curUser: { openid } } = ctx.session;
  const works = await Works.retrieveAll(openid);
  return sendData(ctx, { works }, 'OK', '获取当前用户的works列表成功');
};

exports.createOneWorks = async (ctx) => {
  const { body: { video_id } } = ctx.paramData;
  const { openid } = ctx.session;
  const { insertId } = await Works.createOneWorks(video_id, openid);
  return sendData(ctx, { works_id: insertId }, 'OK', '新建作品成功');
}

exports.parseOneWorks = async (ctx, next, works_id) => {
  const { openid } = ctx.session;
  const [works] = await Works.retrieveOne(works_id, openid);
  if (!works) {
    throw new AppError.SoftError(AppError.NOT_FOUND, `works${works_id}不存在或无权访问`);
  }
  ctx.paramData.works = works;
  return next();
};

exports.startFaceReplacing = async (ctx) => {
}

exports.startDubbing = async (ctx) => {
}

exports.queryProgress = async (ctx) => {
}
