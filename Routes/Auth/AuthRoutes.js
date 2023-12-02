const express = require('express')
const auth = require('../../Middleware/AuthMiddleware')
const imageupload = require('../../Middleware/fileUpload')
const { Login, Register, verifyotp, getalluser, upload } = require('../../Controllers/Auth/AuthController')

const router = express.Router()

router.route('/login').post(Login)
router.route('/register').post(imageupload.single('profile'), Register)
router.route('/verifyotp').post(verifyotp)
router.route('/getalluser').get(auth, getalluser);
router.route('/imageupload').post(imageupload.single('profile'), upload);


module.exports = router
