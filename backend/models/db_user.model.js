const mongoose = require("mongoose");
const moment = require("moment-timezone");

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: "http://localhost:4001/images/default.png"},
    isAdmin: { type: Boolean, default: false },
    token: { type: String },
    friendList: { type: Array, default: [] },
  createdAt: {
    type: Date,
    default: () => moment().add(2, 'hours'),
  },
  updatedAt: {
    type: Date,
    default: () => moment().add(2, 'hours'),
  },}
);

module.exports = mongoose.model("user", userSchema);
