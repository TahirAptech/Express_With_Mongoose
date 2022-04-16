// getting-started.js
const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    password: String
})

module.exports = mongoose.model('user', userschema);