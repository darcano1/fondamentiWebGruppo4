const mongoose = require("mongoose");

const { MONGO_URI } = process.env;

exports.connect = () => {
  // Connecting to the database
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("Connessione al database OK");
    })
    .catch((error) => {
      console.log("ERRORE NELLA CONNESIONE AL DATABASE");
      console.error(error);
      process.exit(1);
    });
};
