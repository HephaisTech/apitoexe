const router = require('express').Router();
const typeCtrl = require('../controllers/typeCtrl');
const type = new typeCtrl();

router.get('/all', type.getAlltype);
router.get('/id', type.getTypebyId);
router.post('/create', type.createType);
router.post('/Multi', type.createMulti);
router.put('/', type.updateType);
router.delete('/', type.deleteType);
router.delete('/destroy', type.destroyType);



module.exports = router;