const router = require('express').Router();

const ActiviteCtrl = require('../controllers/activiteCtrl');

const ctrler = new ActiviteCtrl();

router.get('/all', ctrler.getAll)
router.get('/id', ctrler.getById)
router.post('/search', ctrler.getAnyWhere)
router.post('/recouvre', ctrler.getRecouvrement)
router.post('/create', ctrler.create)
router.post('/multi', ctrler.createMulti)
router.put('/update', ctrler.update)
router.delete('/delete', ctrler.delete)
router.delete('/destroy', ctrler.destroy)


module.exports = router;