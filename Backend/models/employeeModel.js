const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Manager','Employee'],
        required: true,
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref:"User",

    }
});

module.exports = mongoose.model('Employee',employeeSchema);