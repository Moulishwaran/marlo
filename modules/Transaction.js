const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phonenumber: { type: Number, required: true },
  dateofbirth: { type: Date, required: true },
  occupation: { type: String, required: true },
  company: { type: String, required: true },
});

const transactionModel = mongoose.model("Transactions", transactionSchema);
module.exports = transactionModel;
