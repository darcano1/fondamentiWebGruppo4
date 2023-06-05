const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const hostname = '127.0.0.1';
const port = 3000;

//CONNESSIONE DATABASE
mongoose.connect("mongodb+srv://darcano1:PmxsGoBWKfw4NNgS@progettogruppo4.n4ro1yu.mongodb.net/ProgettoGruppo4", {useNewUrlParser: true})
    const db = mongoose.connection;  
    db.once("open", () => {   
        console.log("connesso al database");
    });


app.listen(3195, () => {
        console.log("_____________________________________");
        console.log("Sto ascoltando su porta 3195");
    });

app.get('/', (req, res) => {
    res.send('Homepage');
});