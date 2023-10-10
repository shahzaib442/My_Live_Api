const express = require('express')
const { Login, Register, getalluser, sendotp } = require('../../Controllers/UserController/UserController')
const auth = require('../../Middleware/AuthMiddleware')

const router = express.Router()

router.route('/login').post(Login)
router.route('/register').post(Register)
router.route('/alluser').get(auth, getalluser)
// router.route('/sendotp').post(sendotp)


module.exports = router