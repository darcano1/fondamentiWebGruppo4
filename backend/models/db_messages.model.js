const mongoose = require("mongoose");
const moment = require("moment-timezone");

const messagesSchema = mongoose.Schema(
    {
        conversationId: {
          type: String,
        },
        sender: {
          type: String,
        },
        text: {
          type: String,
        },
      },
      {
        timestamps: {
          currentTime: () => moment().tz("Europe/Rome").format("YYYY-MM-DD HH:mm:ss"),
        }, }
    );

module.exports = mongoose.model("Message", messagesSchema);