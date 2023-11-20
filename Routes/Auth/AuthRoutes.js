const express = require('express')
const auth = require('../../Middleware/AuthMiddleware')
const { Login, Register, verifyotp, getalluser } = require('../../Controllers/Auth/AuthController')

const router = express.Router()

router.route('/login').post(Login)
router.route('/register').post(Register)
router.route('/verifyotp').post(verifyotp)
router.route('/getalluser').get(auth, getalluser);


module.exports = router
