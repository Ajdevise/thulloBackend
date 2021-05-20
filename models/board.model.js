const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 4,
        maxlength: 20,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    description: {
        type: String,
        maxlength: 255,
    },
    members: [
        { 
            _id: false, type: mongoose.Schema.Types.ObjectId, ref: 'User' 
        }
    ],
    cover: {
        type: String
    },
    lists: [
        { 
            _id: false, type: mongoose.Schema.Types.ObjectId, ref: 'List' 
        }
    ],
    visibility: {
        type: String,
        enum: ["public", "private"],
        default: "private"
    }
}, { timestamps: true })

const Board = mongoose.model("Board", boardSchema);
module.exports = Board;