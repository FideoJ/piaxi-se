const Router = require('koa-express-router');
const bgmCtrl = require('../controllers/bgm');
const { exportRtr } = require('../utils');

const router = new Router({ prefix: '/bgms' });

exports = module.exports = () => exportRtr(router);

router.get('/', bgmCtrl.retrieveAll);