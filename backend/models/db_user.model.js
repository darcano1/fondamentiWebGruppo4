const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: {type: String, required: true, unique: true},
    password: { type: String, required: true },
    profilePic: { type: String, default: "" },
    isAdmin: { type: Boolean, default: false },
    phone: { type: String, default: "" },
    token: { type: String, default: "" },
}, 
{ timestamps: true
});

module.exports = mongoose.model("user", userSchema);