const express = require('express')
const { Login, Register, getalluser } = require('../../Controllers/UserController/UserController')
const auth = require('../../Middleware/AuthMiddleware')

const router = express.Router()

router.route('/login').post(Login)
router.route('/register').post(Register)
router.route('/alluser').get(auth, getalluser)


module.exports = router