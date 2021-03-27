const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'User name cannot be blank']
    },
    password: {
        type: String,
        required: [true, 'Password cannot be blank']
    },
    name: String,
    reg: String,
    department: String,
    year: Number,
    whatsapp_number: String,
    phone_number: String,
    domain_1: String,
    domain_2: String,
    selection_level: String,
    selection_level1: String,
    behance: String,
    dribble: String,
    github: String,
    medium: String,
    linkedin: String,
    Assignment1: String,
    day: String,
    time: String,
    day1: String,
    time1: String,
    corp: String,
});

module.exports = mongoose.model('User', userSchema);