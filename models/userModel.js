const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    },
    Password: {
        type: String,
        required: true,
    },
    Access:{
        type: boolean
    },
    dateOfCreation: {
        type: Date,
        default: Date.now, 
    }
});

module.exports = mongoose.model('Admin', UserSchema);
