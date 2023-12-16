const mongoose = require('mongoose');

const DriverRating = new mongoose.Schema({
    driverid: { type: Schema.Types.ObjectId, ref: "driver" },
    ratedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    rideRequestId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'riderequest',
        required: true
    },
    comment: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('driverrating', DriverRating);
