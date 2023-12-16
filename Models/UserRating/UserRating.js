const mongoose = require('mongoose');

const UserRating = new mongoose.Schema({
    userid: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    ratedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'driver',
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

module.exports = mongoose.model('userratings', UserRating);
