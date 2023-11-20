var jwt = require('jsonwebtoken');
const authmodel = require('../../Models/Auth/AuthModel')

const SECRET_KEY = 'SECRET_KEY'

const Login = async (request, response) => {
    const { phone } = request.body;
    const checkuser = await usermodel.findOne({ phone: phone });

    if (checkuser) {
        response.status(200).json({
            message: 'User Login Success',
            data: ({
                ...checkuser._doc_id,
            })
        });
    } else {
        response.status(200).json({
            message: 'Phone Number Not Exist',
        });
    }
}

const Register = async (request, response) => {
    const checkuser = await authmodel.findOne({ phone: request.body.phone });

    if (checkuser) {
        response.status(200).json({
            message: 'User Already Exists',
        });
    } else {
        try {
            const newuser = new authmodel({
                name: request.body.name,
                phone: request.body.phone,
                gender: request.body.gender,
                dob: request.body.dob,
            });

            const saveuser = await newuser.save();
            response.status(200).json({
                message: 'User Register Success',
                data: ({
                    ...saveuser._doc._id,
                }),
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({ error: 'User Not Created' });
        }
    }
};


const verifyotp = async (request, response) => {
    try {
        const checkuser = await authmodel.findOne({ _id: request.body.id });

        if (checkuser.isValid == false) {
            checkuser.isValid = true;
            const data = await checkuser.save(); // Use await to handle the save operation asynchronously
            var token = jwt.sign({ user_id: checkuser?._id, phone: checkuser.phone }, SECRET_KEY);
            response.status(200).json({
                message: 'isValid field updated successfully',
                data: ({
                    ...data._doc,
                    token: token
                })
            });
        } else {
            var token = jwt.sign({ user_id: checkuser?._id, phone: checkuser.phone }, SECRET_KEY);
            response.status(200).json({
                message: 'Field Already Updated',
                data: ({
                    ...checkuser._doc,
                    token: token
                })
            });
        }
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Error updating isValid field' });
    }
};


const getalluser = async (request, response) => {
    try {
        const checkuser = await authmodel.find();
        response.status(200).json({
            message: 'User Data',
            data: checkuser
        });
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    Login,
    Register,
    verifyotp,
    getalluser
}