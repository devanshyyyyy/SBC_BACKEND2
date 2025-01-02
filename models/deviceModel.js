const mongoose = require('mongoose');

const DeviceSchema = new mongoose.Schema({
    Serial_Number: {
        type : String,
        required: true,
    },
    Device_ID: {
        type : String,
        required: true,
    },
    Device_Name: {
        type : String,
        required: true,
    },
    IP_Address: {
        type : String,
        required: true,
    },
    MAC: {
        type : String,
        required: true,
    },
    Connected_PIDs: {
        type : String,
        required: true,
    },
},{timestamps:true});

module.exports = mongoose.model('Device',DeviceSchema);