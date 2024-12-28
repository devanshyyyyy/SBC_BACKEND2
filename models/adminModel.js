const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
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
    dateOfCreation: {
        type: Date,
        default: Date.now, 
    }
});

module.exports = mongoose.model('Admin', AdminSchema);
