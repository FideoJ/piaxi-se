const { sendData, AppError } = require('../utils');
const Video = require('../models/video');

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
  const { video: { video_id, name } } = ctx.paramData;
  const roles = await Video.retrieveRolesForOne(video_id);
  return sendData(ctx, { name, roles }, 'OK', `获取video${video_id}详情成功`);
};