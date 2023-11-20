const mongoose = require('mongoose');

const genderEnum = ['male', 'female', 'other'];

const dobValidator = {
    validator: function (value) {
        const regex = /^\d{2}-\d{2}-\d{4}$/;
        return regex.test(value);
    },
    message: 'Invalid date of birth format. Please use dd-mm-yyyy.',
};

const Auth = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    gender: { type: String, required: true, enum: genderEnum },
    dob: { type: String, required: true, validate: dobValidator },
    isValid: { type: Boolean, default: false},
}, { timestamps: true });

module.exports = mongoose.model('Auth', Auth);
