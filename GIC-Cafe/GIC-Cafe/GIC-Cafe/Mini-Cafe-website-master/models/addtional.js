const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    variation: {
        type: String,
        required: false
    },
    choice: {
        type: String,
        required: false
    }
});

const additional = mongoose.model('additional', UserSchema);
module.exports = additional;