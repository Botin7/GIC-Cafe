const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: false
    },
   
    phone: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    message: {
        type: String,
        required: false
    },
    postAt: {
        type: String,
        required: true
    },
    product: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: false
    },
    
});

const Chat = mongoose.model('Chat', UserSchema);
module.exports = Chat;