

const ContribCtrl = require('../controllers/contribCtrl');
const router = require('express').Router();
const Contrib = new ContribCtrl();


router.get('/all', Contrib.getContrib);
router.get('/id', Contrib.getContribById);
//
router.post('/create', Contrib.createContrib);
router.post('/enroler', Contrib.enrollerWithActivities);
router.post('/multi', Contrib.createMultipleContrib);
//
router.delete('/', Contrib.deleteContrib);
router.delete('/destroy', Contrib.destroyContrib);

module.exports = router;