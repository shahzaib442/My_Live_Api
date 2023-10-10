const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
// const nodemailer = require("nodemailer");
const usermodel = require('../../Models/UserModel/UserModel')

const SECRET_KEY = 'SECRET_KEY'

// const transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//         user: 'muhammadshahzaib955@gmail.com',
//         pass: 'rotj vwsu rgab fyaw',
//     },
//     secure: true, 
// });

const Login = async (request, response) => {
    const { email, password } = request.body;
    const checkuser = await usermodel.findOne({ email: email });

    if (checkuser) {
        const isPasswordValid = await bcrypt.compare(password, checkuser.password);

        if (isPasswordValid) {
            var token = jwt.sign({ user_id: checkuser?._id, email }, SECRET_KEY);
            response.status(200).json({
                message: 'User Login Success',
                data: ({
                    ...checkuser._doc,
                    token: token
                })
            });
        } else {
            response.status(200).json({
                message: 'Incorrect password',
            });
        }
    } else {
        response.status(200).json({
            message: 'Incorrect Email Address',
        });
    }
}

const Register = async (request, response) => {
    const checkuser = await usermodel.findOne({ email: request.body.email })

    if (checkuser) {
        response.status(200).json({
            message: 'User Already Exists',
        });
    } else {
        const password = request.body.password
        const salt = await bcrypt.genSalt()
        const hashpassword = await bcrypt.hash(password, salt)

        try {
            const newuser = new usermodel({
                username: request.body.username,
                email: request.body.email,
                password: hashpassword,
                phone: request.body.phone,
            });

            const saveuser = await newuser.save();

            response.status(200).json(saveuser);
        } catch (error) {
            console.error(error);
            response.status(500).json({ error: 'User Not Created' });
        }
    }
}

// const sendotp = async (request, response) => {
//     const mailOptions = {
//         from: 'muhammadshahzaib955@gmail.com',
//         to: 'muhammadshahzaib9556@example.com',
//         subject: 'Hello from Nodemailer',
//         text: 'This is a test email sent from Nodemailer.',
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.error('Error sending email: ', error);
//         } else {
//             console.log('Email sent: ', info.response);
//         }
//     });
// }


const getalluser = async (request, response) => {
    const allusers = await usermodel.find()
    response.status(200).json({ user: allusers })
}

module.exports = {
    Login,
    Register,
    getalluser,
    // sendotp
}