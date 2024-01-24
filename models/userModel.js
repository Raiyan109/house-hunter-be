const mongoose = require('mongoose');

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
    },
    role: {
        type: Number,
        default: 0
    },
    phone: {
        type: Number,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    houses: [{
        type: mongoose.Types.ObjectId,
        ref: 'House'
    }],
    bookings: [{
        type: mongoose.Types.ObjectId,
        ref: 'Booking',
        max: [2, 'You cannot book over 2 houses']
    }]
})

module.exports = mongoose.model('User', userSchema)