// getting-started.js
const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    cource: String,
})

module.exports = mongoose.model('user', userschema);