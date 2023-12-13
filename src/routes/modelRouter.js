const router = require('express').Router();
const ModelCtrl = require('../controllers/modelCtrl');

const modelCtrler = new ModelCtrl();

router.get('/all', modelCtrler.getAllModeles);
router.get('/id', modelCtrler.getModelId);
router.post('/create', modelCtrler.createModel);
router.post('/multi', modelCtrler.createMulti);
router.put('/id', modelCtrler.update);
router.delete('/', modelCtrler.delete);
router.delete('/destroy', modelCtrler.destroy);


module.exports = router;