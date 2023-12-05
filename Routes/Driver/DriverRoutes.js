const express = require('express')
const imageupload = require('../../Middleware/fileUpload')
const { Login, Register,verifyotp } = require('../../Controllers/Driver/DriverController')
const router = express.Router()

router.route('/login').post(Login)
router.route('/register').post(imageupload.array("driver", 3), Register)
router.route('/verifyotp').post(verifyotp)

module.exports = router
