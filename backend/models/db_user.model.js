const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: "" },
    isAdmin: { type: Boolean, default: false },
    token: { type: String },
    friendList: { type: Array, default: [] },
  },
  {
    timestamps: {
      currentTime: () => moment().tz("Europe/Rome").format("YYYY-MM-DD HH:mm:ss"),
    },
  }
);

module.exports = mongoose.model("user", userSchema);
