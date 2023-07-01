const mongoose = require("mongoose");
const moment = require("moment-timezone");

const chatSchema = mongoose.Schema(
    {
        members: {
          type: Array,
        },
      },
      {
        timestamps: {
          currentTime: () => moment().tz("Europe/Rome").format("YYYY-MM-DD HH:mm:ss"),
        },}
    );

module.exports = mongoose.model("Chat", chatSchema);