const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    service: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    amount: {
        type: Number,
        required: false
    },
    total: {
        type: String,
        required: false
    },
    payment: {
        type: String,
        required: false
    },
    localtime: {
        type: String,
        required: false
    },
    time:{
        type: String,
        required: false
    },
    location: {
        type: String,
        required: false
    },
    people: {
        type: Number,
        required: false
    },
    product: {
        type: String,
        required: false
    },
    variation: {
        type: String,
        required: false
    },
    choice: {
        type: String,
        required: false
    },
    surgar: {
        type: String,
        required: false
    },
    table: {
        type: String,
        required: false
    },

});

const Booking = mongoose.model('Booking', UserSchema);
module.exports = Booking;