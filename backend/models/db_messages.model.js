const mongoose = require("mongoose");

const messagesSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    sender :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiver :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now(),
        required: true
    },
    read: {
        type: Boolean,
        default: false,
        required: true
    }
});

module.exports = mongoose.model("Message", messagesSchema);