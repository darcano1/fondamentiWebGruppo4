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
    createdAt: {
      type: Date,
      default: () => moment().add(2, 'hours'),
    },
    updatedAt: {
      type: Date,
      default: () => moment().add(2, 'hours'),
    },
  }
);

module.exports = mongoose.model("Message", messagesSchema);
