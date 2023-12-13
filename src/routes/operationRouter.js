const router = require('express').Router()
const operationCtrl = require('../controllers/operationCtrl')
const ctrler = new operationCtrl()


router.get('/all', ctrler.getAll)
router.post('/brouillard', ctrler.getByAgentDate)
router.get('/id', ctrler.getById)
router.post('/create', ctrler.create)
router.post('/multi', ctrler.createMulti)
router.post('/petaxe', ctrler.createTaxeEncaisse)
router.post('/pedroit', ctrler.createDroitEncaisse)
router.post('/petaxeAmbulant', ctrler.createDroitEncaisse)
router.put('/multi', ctrler.update)
router.delete('/delete', ctrler.delete)
router.delete('/destroy', ctrler.destroy)


module.exports = router 