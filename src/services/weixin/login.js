const request = require('request-promise-native');
const { AppError } = require('../../utils');
const { weixin } = require('../../config');

exports = module.exports = {
  login,
};

async function login(code) {
  const option = {
    method: 'GET',
    uri: weixin.url,
    qs: {
      appid: weixin.appid,
      secret: weixin.appsecret,
      js_code: code,
      grant_type: 'authorization_code'
    }
  };

  let result = null;
  try {
    result = await request(option);
    result = JSON.parse(result);
  } catch (e) {
    throw new AppError.HardError(AppError.INTERNAL_ERROR, '请求weixin api时出错', 500, e);
  }

  if (result.errcode) {
    const e = new Error(result.errmsg);
    Object.assign(e, { result, option });
    throw new AppError.SoftError(AppError.UNAUTHORIZED, 'weixin登录失败');
  }

  return result;
}
