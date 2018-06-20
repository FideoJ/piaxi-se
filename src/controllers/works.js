const { sendData, AppError } = require('../utils');
const Works = require('../models/works');

exports.retrieveAll = async (ctx) => {
  const { curUser: { openid } } = ctx.session;
  const works = await Works.retrieveAll(openid);
  return sendData(ctx, { works }, 'OK', '获取当前用户的works列表成功');
};