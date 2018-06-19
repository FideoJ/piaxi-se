const { sendData, AppError } = require('../utils');
const Bgm = require('../models/bgm');

exports.retrieveAll = async (ctx) => {
  const bgms = await Bgm.retrieveAll();
  return sendData(ctx, { bgms }, 'OK', '获取bgm列表成功');
};