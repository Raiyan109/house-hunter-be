const mongoose = require('mongoose');

const Schema = mongoose.Schema


const bookingModel = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        default: 0
    },
    phone: {
        type: Number,
    },
    bookedBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    bookingsList:
    {
        type: String
    },


})

module.exports = mongoose.model('Booking', bookingModel)