const router = require('express').Router()
const typeOpeCtrl = require('../controllers/typeOpeCtrl')
const ctrler = new typeOpeCtrl()


router.get('/all', ctrler.getAll)
router.get('/id', ctrler.getById)
router.post('/create', ctrler.create)
router.post('/multi', ctrler.createMulti)
router.put('/multi', ctrler.update)
router.delete('/delete', ctrler.delete)
router.delete('/destroy', ctrler.destroy)


module.exports = router 