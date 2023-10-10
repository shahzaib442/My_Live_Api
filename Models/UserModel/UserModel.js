const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email: { type: 'string', required: true },
    password: { type: 'string', required: true },
    username: { type: 'string', required: true },
    phone: { type: 'string', required: true },
    token: { type: 'string' },
}, { timestamps: true })

module.exports = mongoose.model('User', UserSchema)