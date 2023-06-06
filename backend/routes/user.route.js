const User = require("../models/db_user.model");
const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// get user by username (auth)
router.get("/:username", auth, async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) {
            return res.status(404).send("Utente non trovato");
        }
        //mostra id, user, email
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
        });
    } catch (err) {
        console.log(err);
    }
}
);

router.get("/addFriend/:_id", auth, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params._id });

        
        const currentUser = req.user.user_id;
        console.log(currentUser);
        if (!user) {
            return res.status(404).send("Utente non trovato");
        }

        if (user._id == currentUser) {
            return res.status(404).send("Non puoi aggiungere te stesso");
        }

        if (currentUser.friendList.includes(user._id)) {
            return res.status(404).send("Utente già aggiunto");
        }

        await User.updateOne({ _id: currentUser }, { $push: { friendList: user._id } });

    } catch (err) {
        console.log(err);
    }
});



        

module.exports = router;