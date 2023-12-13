const { login } = require("../controllers/authCtrl");
const router = require('express').Router()  
/**
 * @swagger
 * /auth/login:
 *   post:
 *     description: authenticate a user  email required && password required
 *     responses:
 *       200:
 *         description: result true/ false and new header cookie  CDATOKEN
 */
router.post('/login', login);

module.exports = router;