require("dotenv").config();
require("./config/database.config").connect();
const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");

const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const messagesRoute = require("./routes/messages.route");
const chatRoute = require("./routes/chat.route");

app.use(express.json({ limit: "50mb" }));
app.use(helmet());
app.use(morgan("common"));


app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/messages", messagesRoute);
app.use("/api/chat", chatRoute);


  // PAGINA INESISTENTE
  app.use("*", (req, res) => {
    res.status(404).json({
      success: "false",
      message: "Pagina non trovata",
      error: {
        statusCode: 404,
        message: "Questa pagina non è stata definita",
      },
    });
  });

  module.exports = app;