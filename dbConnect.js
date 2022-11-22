const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://Moulish:admin@cluster0.4grmjbw.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const connection = mongoose.connection;

connection.on("error", (err) => console.log(err));

connection.on("connected", () => console.log("Mongodb connected Successfully"));
