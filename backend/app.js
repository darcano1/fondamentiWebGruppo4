require("dotenv").config();
require("./config/database.config").connect();
const multer = require("multer");
const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require('cors')

const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const messagesRoute = require("./routes/messages.route");
const chatRoute = require("./routes/chat.route");

app.use(express.json({ limit: "50mb" }));
app.use(helmet());
app.use(morgan("common"));
app.use(cors())


app.use("/images", express.static(__dirname + "/public/images"));


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploaded successfully");
  } catch (error) {
    console.error(error);
  }
});


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