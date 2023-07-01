const mongoose = require("mongoose");
const moment = require("moment-timezone");

const chatSchema = mongoose.Schema(
    {
        members: {
          type: Array,
        },
      },
      {
        createdAt: {
          type: Date,
          default: () => moment().add(2, 'hours'),
        },
        updatedAt: {
          type: Date,
          default: () => moment().add(2, 'hours'),
        },}
      );

module.exports = mongoose.model("Chat", chatSchema);