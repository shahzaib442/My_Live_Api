var jwt = require('jsonwebtoken');
const authmodel = require('../../Models/Auth/AuthModel')

const SECRET_KEY = 'SECRET_KEY'

const Login = async (request, response) => {
    const { phone } = request.body;
    try {
        const checkuser = await authmodel.findOne({ phone: phone });
        if (checkuser) {
            response.status(200).json({
                message: 'User Login Success',
                data: checkuser._doc, // Removed unnecessary spread operator
            });
        } else {
            response.status(200).json({
                message: 'Phone Number Not Exist',
            });
        }
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};

const Register = async (request, response) => {
    const checkuser = await authmodel.findOne({ phone: request.body.phone });

    if (checkuser) {
        response.status(200).json({
            message: 'User Already Exists',
        });
    } else {
        try {
            if (!request.file) {
                return response.status(400).json({ error: 'Image upload failed' });
            }

            // Get the image URL from the request file object
            const imageUrl = request.file.location;
            const newuser = new authmodel({
                name: request.body.name,
                phone: request.body.phone,
                gender: request.body.gender,
                dob: request.body.dob,
                image: imageUrl
            });

            const saveuser = await newuser.save();
            response.status(200).json({
                message: 'User Register Success',
                data: saveuser,
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
        if (checkuser) {
            if (!checkuser.isValid) {
                checkuser.isValid = true;
                const data = await checkuser.save();
                const token = jwt.sign({ user_id: checkuser._id, phone: checkuser.phone }, SECRET_KEY);
                response.status(200).json({
                    message: 'isValid field updated successfully',
                    data: {
                        ...data._doc,
                        token: token,
                    },
                });
            } else {
                const token = jwt.sign({ user_id: checkuser._id, phone: checkuser.phone }, SECRET_KEY);
                response.status(200).json({
                    message: 'Field Already Updated',
                    data: {
                        ...checkuser._doc,
                        token: token,
                    },
                });
            }
        } else {
            response.status(200).json({
                message: 'User not found',
            });
        }
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal Server Error' });
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

const upload = (req, res) => {
    try {
        // Check if the image upload was successful
        if (!req.file) {
            return res.status(400).json({ error: 'Image upload failed' });
        }

        // Get the image URL from the request file object
        const imageUrl = req.file.location;

        console.log(`Image URL: ${imageUrl}`);
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    Login,
    Register,
    verifyotp,
    getalluser,
    upload
}