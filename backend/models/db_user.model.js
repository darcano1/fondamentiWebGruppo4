const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
<<<<<<< HEAD
    username: { type: String, required: true, unique: true},
=======
    username: { type: String, required: true, unique: true },
>>>>>>> 41ca182f3553425bc08e2649787413b45a8b0c10
    email: {type: String, required: true, unique: true},
    password: { type: String, required: true },
    profilePic: { type: String, default: "" },
    isAdmin: { type: Boolean, default: false },
<<<<<<< HEAD
    token: { type: String},
    friendList: { type: Array, default: [] },
=======
    phone: { type: String, default: "" },
    token: { type: String, default: "" },
>>>>>>> 41ca182f3553425bc08e2649787413b45a8b0c10
}, 
{ timestamps: true
});

module.exports = mongoose.model("user", userSchema);