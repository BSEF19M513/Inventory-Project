// Admin.js
const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    adminId: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String
    }
});

module.exports = mongoose.model('Admin', AdminSchema);