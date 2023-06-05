const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    }]
});

module.exports = mongoose.model("Chat", chatSchema);