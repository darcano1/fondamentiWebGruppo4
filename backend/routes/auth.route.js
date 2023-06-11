const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const User = require("../models/db_user.model");

// Register
router.post("/register", async (req, res) => {
    try {
        const { email, password, username } = req.body;
        if (!(email && password && username)) {
            res.status(400).send("Tutti i campi sono obbligatori");
        }
        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.status(409).send("Utente già registrato. Effettua il login");
        }
        let encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email: email.toLowerCase(),
            password: encryptedPassword,
            username: username,
            isAdmin: false,
            profilePic: "",
            friendList: [],
        });
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
        user.token = token;
        //ritorna id, user, email
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: user.token,
        });
    } catch (err) {
        console.log(err);
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            return res.status(400).send("Tutti i campi sono obbligatori");
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

            return res.status(201).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                token: user.token,
            });
        }
        return res.status(400).send("Credenziali non valide");
    } catch (err) {
        console.log(err);
        // Handle the error appropriately, e.g., send an error response
        return res.status(500).send("Internal Server Error");
    }
});


router.get("/welcome", auth, (req, res) => {
    res.status(200).send("Benvenuto");
});

module.exports = router;
  