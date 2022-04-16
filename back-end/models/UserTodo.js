const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    todo: String,
    UserId: String,
    IsPrivate: Boolean
})

module.exports = mongoose.model('todos', TodoSchema);