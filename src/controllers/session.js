const { AppError, sendData, pick } = require('../utils');
const config = require('../config');
const WeixinServ = require('../services/weixin');

exports.create = async (ctx) => {
  delete ctx.session.curUser;

  const { body: { code } } = ctx.paramData;
  const { openid, session_key } = await WeixinServ.login(code);

  ctx.session.curUser = { openid, session_key };
  return sendData(ctx, { openid }, 'OK', '登录成功');
};