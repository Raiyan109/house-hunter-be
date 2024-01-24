const mongoose = require('mongoose');

const Schema = mongoose.Schema

const houseSchema = new Schema({
    name: {
        type: String,
    },
    address: {
        type: String,
        default: 0
    },
    phone: {
        type: Number,
    },
    city: {
        type: String,
    },
    bedrooms: {
        type: Number,
    },
    bathrooms: {
        type: Number,
    },
    size: {
        type: Number,
    },
    image: {
        type: String,
    },
    available: {
        type: String,
    },
    rent: {
        type: Number,
    },
    desc: {
        type: String,
    },
    addedBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },

})

module.exports = mongoose.model('House', houseSchema)