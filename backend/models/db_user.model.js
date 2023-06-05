const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    password: String,
    email: String,
    nome: String,
    cognome: String,
    telefono: String,
    chats: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat"
    }]

});

module.exports = mongoose.model("User", userSchema);