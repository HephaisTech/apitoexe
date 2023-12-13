const router = require('express').Router()
const MesureCtrl = require('../controllers/mesureCtrl')
const ctrler = new MesureCtrl()


router.get('/all', ctrler.getAll)
router.get('/id', ctrler.getById)
router.post('/create', ctrler.create)
router.post('/milti', ctrler.createMulti)
router.put('/update', ctrler.update)
router.delete('/delete', ctrler.delete)
router.delete('/destroy', ctrler.destroy)

module.exports = router 
