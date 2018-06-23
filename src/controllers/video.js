const request = require('request-promise-native');
const { sendData, AppError } = require('../utils');
const { filer } = require('../config');
const Video = require('../models/video');
const srt = require("srt").fromString;
const path = require('path');

exports.retrieveAll = async (ctx) => {
  const videos = await Video.retrieveAll();
  return sendData(ctx, { videos }, 'OK', '获取video列表成功');
};

exports.parseOneVideo = async (ctx, next, video_id) => {
  const [video] = await Video.retrieveOne(video_id);
  if (!video) {
    throw new AppError.SoftError(AppError.NOT_FOUND, `video${video_id}不存在`);
  }
  ctx.paramData.video = video;
  return next();
};

exports.retrieveOne = async (ctx) => {
  const { video: { video_id, name, duration } } = ctx.paramData;
  const roles = await Video.retrieveRolesForOne(video_id);
  return sendData(ctx, { name, duration, roles }, 'OK', `获取video${video_id}详情成功`);
};

exports.retrieveSubtitle = async (ctx) => {
  const { video: { video_id } } = ctx.paramData;
  const srtPath = filer.url + path.join('/videos', `${video_id}`, 'subtitle.srt');
  const subtitleFile = await request(srtPath);
  const subtitle = srt(subtitleFile);
  return sendData(ctx, { subtitle }, 'OK', `获取video字幕成功`);
}