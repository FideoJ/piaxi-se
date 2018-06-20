const Router = require('koa-express-router');
const worksCtrl = require('../controllers/works');
const { exportRtr } = require('../utils');

const router = new Router({ prefix: '/works' });

exports = module.exports = () => exportRtr(router);

router.get('/', worksCtrl.retrieveAll);