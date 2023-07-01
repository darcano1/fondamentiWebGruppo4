const router = require("express").Router();
const Chat = require("../models/db_chat.model");

// new chat
router.post("/", async (req, res) => {

    const newChat = new Chat({
        members: [req.body.senderId, req.body.receiverId],
    });

    //creo la chat con i due utenti, se la chat esiste già non la ricreo
    try {
        if (await Chat.findOne({ members: { $all: [req.body.senderId, req.body.receiverId] } })) {
            //stampo id della chat già esistente
            const chat = await Chat.findOne({ members: { $all: [req.body.senderId, req.body.receiverId] } });
            res.status(200).json(chat);
        }
        else {
        const savedChat = await newChat.save();
        res.status(200).json(savedChat);}
    }
    catch (err) {
        res.status(500).json(err);
    }
}
);

router.get("/:userId", async (req, res) => {
    try {
        const chat = await Chat.find({
            members: { $in: [req.params.userId] },
        });
        res.status(200).json(chat);
    }
    catch (err) {
        res.status(500).json(err);
    }
}
);

router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
    try {
        const chat = await Chat.findOne({
            members: { $all: [req.params.firstUserId, req.params.secondUserId] },
        });
        res.status(200).json(chat);
    }
    catch (err) {
        res.status(500).json(err);
    }
}
);

module.exports = router;

