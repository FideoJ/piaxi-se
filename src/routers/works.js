const Router = require('koa-express-router');
const worksCtrl = require('../controllers/works');
const { exportRtr, isPositiveInt } = require('../utils');

const router = new Router({ prefix: '/works' });

exports = module.exports = () => exportRtr(router);

router.get('/', worksCtrl.retrieveAll);
router.post('/', worksCtrl.createOneWorks);

router.param(
  'works_id',
  worksCtrl.parseOneWorks,
);

router.use(`/:works_id${isPositiveInt}`, oneWorks());

function oneWorks() {
  const idRtr = new Router({ mergeParams: true });

  idRtr.post('/face-replacing', worksCtrl.startFaceReplacing);
  idRtr.post('/dubbing', worksCtrl.startDubbing);
  idRtr.get('/progress', worksCtrl.queryProgress);

  return exportRtr(idRtr);
}
