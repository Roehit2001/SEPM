const mongoose = require('mongoose');

const cyber = new mongoose.Schema({
    level1: String,
    time1: String,
    level2: String,
    time2: String,
    Assi: String,
    d1: String,
    t1: String,
    t2: String,
    t3: String,
    d2: String,
    t4: String,
    t5: String,
    t6: String,
    d3: String,
    t7: String,
    t8: String,
    t9: String
});

module.exports = mongoose.model('cyber', cyber);