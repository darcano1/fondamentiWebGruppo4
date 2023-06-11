const User = require("../models/db_user.model");
const router = require('express').Router();
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

router.get("/profile/:_id", async (req, res) => {
  try{
    const id = await User.findOne({ _id: req.params._id });
    if (!id) {
      return res.status(404).send("Utente non trovato");
    }
    res.status(200).json({
      _id: id._id,
      username: id.username,
      email: id.email,
      friendList: id.friendList,
      profilePic: id.profilePic
    })

  }
  catch(err){
    console.log(err);
  }
});

router.put("/addFriend/:_id", auth, async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params._id });
      if (!user) {
        return res.status(404).send("Utente non trovato");
      }
      const currentUser = await User.findOne({ _id: req.user.user_id});
      console.log(currentUser);
      if (user._id == currentUser.user_id) {
        return res.status(400).send("Non puoi aggiungerti come amico");
      }
      if (user.friendList.includes(currentUser.user_id)) {
        return res.status(400).send("Utente già presente nella lista amici");
      }
      currentUser.friendList.push(user._id);
      await currentUser.save();
      res.status(200).send("Amico " + user._id +"aggiunto correttamente nella friendlist di " + currentUser._id);
    } catch (err) {
      console.log(err);
    }
  }
);

router.put("/removeFriend/:_id", auth, async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params._id });
      if (!user) {
        return res.status(404).send("Utente non trovato");
      }
      const currentUser = await User.findOne({ _id: req.user.user_id});
      //console.log(currentUser._id);
      //console.log(user._id);
      if (user._id == currentUser._id) {
        return res.status(400).send("Non puoi rimuovere te stesso dalla friendlist");
      }
      if (!currentUser.friendList.includes(user._id)) {
        return res.status(400).send("Utente non presente nella lista amici");
      }
      currentUser.friendList.pull(user._id);
      await currentUser.save();
      res.status(200).send("Amico " + user._id +" rimosso correttamente dalla friendlist di " + currentUser._id);
    } catch (err) {
      console.log(err);
    }
  }
);

router.get("/friendList/:_id", async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params._id });
      if (!user) {
        return res.status(404).send("Utente non trovato");
      }
      const friendList = user.friendList;
      res.status(200).json(friendList);
    } catch (err) {
      console.log(err);
    }
  }
);


module.exports = router;