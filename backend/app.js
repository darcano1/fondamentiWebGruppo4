require("dotenv").config();
require("./config/database.config").connect();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const auth = require("./middleware/auth.middleware");
const User = require("./models/db_user.model");
const app = express();

app.use(express.json({ limit: "50mb" }));

// Register
app.post("/api/register", async (req, res) => {
    try {
        const { email, password, username } = req.body;
        if (!(email && password && username)) {
            res.status(400).send("Tutti i campi sono obbligatori");
        }
        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.status(409).send("Utente già registrato. Effettua il login");
        }
        encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email: email.toLowerCase(),
            password: encryptedPassword,
            username: username,
        });
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
        user.token = token;
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
});

app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).send("Tutti i campi sono obbligatori");
        }
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );
            user.token = token;
            res.status(200).json(user);
        }
        res.status(400).send("Credenziali non valide");
    } catch (err) {
        console.log(err);
    }
});

app.get("/api/welcome", auth, (req, res) => {
    res.status(200).send("Benvenuto");
});
  
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