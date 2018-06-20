const path = require('path');
const Router = require('koa-express-router');
const bodyParser = require('koa-bodyparser');

const { AppError, handleException } = require('../utils');
const RedisServ = require('../services/redis');

// 默认设置
Router.defaultOptions.mergeParams = true;

/**
 * @param {Application} app
 */
module.exports = (app) => {
  const sessionParser = getSessionParser(app);
  const apiRtr = new Router({ prefix: '/api' });
  apiRtr.use(
    sessionParser,
    getBodyParser(),
    checkIsInWhiteList,
    handleException,
    initParam,
    blockUnauthorized,
  );
  init(apiRtr);

  app.use(apiRtr.routes(false));
};

function getBodyParser() {
  const options = {
    jsonLimit: '10mb',
    textLimit: '10mb',
    /**
     *
     * @param {Error} e
     * @param {Context} ctx
     */
    onerror(e) {
      throw new AppError.SoftError(AppError.BAD_REQUEST, '请求解析失败', 422, e);
    },
  };
  return bodyParser(options);
}


function getSessionParser(app) {
  return RedisServ.session(app);
}

// 无需登录即可访问的 API
const whiteList = [
  '/api/sessions',
];

/**
 * 检查当前路径是否可以不检查登录
 * @param {Context} ctx
 * @param {{(): Promise<any>}} next
 */
async function checkIsInWhiteList(ctx, next) {
  ctx.isInWhiteList = whiteList.some(onePath => ctx.originalUrl === onePath);
  return next();
}

/**
 * 初始化 paramData
 * @param {Context} ctx
 * @param {{(): Promise<any>}} next
 */
async function initParam(ctx, next) {
  // @ts-ignore
  ctx.paramData = {
    body: ctx.request.body,
    query: { ...ctx.request.query },
  };
  return next();
}

/**
 * @param {Context} ctx
 * @param {{(): Promise<any>}} next
 */
async function blockUnauthorized(ctx, next) {
  if (ctx.isInWhiteList || ctx.session.curUser) {
    return next();
  }
  throw new AppError.SoftError(AppError.UNAUTHORIZED, '未登录');
}

function init(router) {
  const routers = [
    'session',
    'bgm',
    'video',
    'works',
  ];
  routers.forEach((rtrName) => {
    const oneRtr = require(path.join(__dirname, rtrName));
    router.use(oneRtr());
  });

  router.use((ctx) => {
    if (ctx.body) return;
    throw new AppError.SoftError(AppError.NOT_FOUND, '啊呀, 迷路了');
  });
}
