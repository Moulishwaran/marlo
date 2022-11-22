const express = require("express");
const Transaction = require("../modules/Transaction");
const router = express.Router();
const moment = require("moment");
const jwt = require("jsonwebtoken");

// Router authentication

function authenticate(req, res, next) {
  //
  if (req.header.authorization) {
    let decode = jwt.verify(req.header.authorization, "thisiskey");
    if (decode) {
      next();
    } else {
      res.status({ message: "Unauthorized" });
    }
  } else {
    res.status({ message: "Unauthorized" });
  }
  next();
}

//create user contact

router.post("/add-transaction", authenticate, async (req, res) => {
  try {
    const newtransaction = new Transaction(req.body);
    await newtransaction.save();
    res.send("UserContact create Successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

// Edit User contact

router.put("/edit-transaction", authenticate, async (req, res) => {
  try {
    await Transaction.findByIdAndUpdate(
      { _id: req.body.transactionId },
      req.body.payload
    );
    res.send("UserContact Updated Successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete User contact

router.delete("/delete-transaction", authenticate, async (req, res) => {
  try {
    await Transaction.findOneAndDelete({ _id: req.body.transactionId });
    res.send("Transaction Delete Successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/get-all-transactions", authenticate, async (req, res) => {
  const { frequency, selectedRange, type } = req.body;
  try {
    const transactions = await Transaction.find({
      ...(frequency !== "Custom"
        ? {
            date: {
              $gt: moment().subtract(Number(req.body.frequency), "d").toDate(),
            },
          }
        : {
            date: {
              $gt: selectedRange[0],
              $lte: selectedRange[1],
            },
          }),
      userid: req.body.userid,
      ...(type !== "all" && { type }),
    });
    res.send(transactions);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
