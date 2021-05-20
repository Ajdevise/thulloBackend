const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 4,
        maxlength: 20,
        required: true
    }
})

const List = mongoose.Model("List", listSchema);
module.exports = List;