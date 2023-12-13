const router = require('express').Router()
const MarcheCtrler = require('../controllers/marcheCtrl')
const ctrler = new MarcheCtrler()


router.get('/all', ctrler.getAll)
router.get('/id', ctrler.getById)
router.post('/create', ctrler.create)
router.post('/multi', ctrler.createMulti)
router.put('/multi', ctrler.update)
router.delete('/delete', ctrler.delete)
router.delete('/destroy', ctrler.destroy)


module.exports = router 