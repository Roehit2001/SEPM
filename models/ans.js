const mongoose = require('mongoose');

const ansSchema = new mongoose.Schema({
    userId: String,
    q1: String,
    a1: String,
    q2: String,
    a2: String,
    q3: String,
    a3: String,
    q4: String,
    a4: String,
    q5: String,
    a5: String,
    q6: String,
    a6: String,
    q7: String,
    a7: String,
    q8: String,
    a8: String,
    q9: String,
    a9: String,
    q10: String,
    a10: String,
    q11: String,
    a11: String,
    q12: String,
    a12: String,
    q13: String,
    a13: String,
    q14: String,
    a14: String,
    q15: String,
    a15: String,
    q16: String,
    a16: String,
    q17: String,
    a17: String,
    q18: String,
    a18: String,
    q19: String,
    a19: String,
    q20: String,
    a20: String,
    q21: String,
    a21: String,
    q22: String,
    a22: String,
    q23: String,
    a23: String,
    q24: String,
    a24: String,
    q25: String,
    a25: String,
    domain: String
});

module.exports = mongoose.model('Ans', ansSchema);