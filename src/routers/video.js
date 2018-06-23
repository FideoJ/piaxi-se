const Router = require('koa-express-router');
const videoCtrl = require('../controllers/video');
const { exportRtr, isPositiveInt } = require('../utils');

const router = new Router({ prefix: '/videos' });

exports = module.exports = () => exportRtr(router);

router.get('/', videoCtrl.retrieveAll);

router.param(
  'video_id',
  videoCtrl.parseOneVideo,
);

router.use(`/:video_id${isPositiveInt}`, oneVideo());

function oneVideo() {
  const idRtr = new Router({ mergeParams: true });

  idRtr.get('/', videoCtrl.retrieveOne);
  idRtr.get('/subtitle', videoCtrl.retrieveSubtitle);

  return exportRtr(idRtr);
}