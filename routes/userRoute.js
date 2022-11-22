const express = require("express");
const User = require("../modules/User");
const router = express.Router();
const bcrypt = require("bcryptjs");

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

//Register Route

router.post("/register", async (req, res) => {
  try {
    const newuser = new User(req.body);
    await newuser.save();
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hash;
    res.send("User Register Successfully");
  } catch (error) {
    res.status(500).json("error");
  }
});

// Login Route

router.post(".login", authenticate, async (req, res) => {
  try {
    const result = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (result) {
      let compare = bcrypt.compareSync(req.body.password, user.password);
      if (compare) {
        let token = jwt.sign({ name: user.name, id: user._id }, "thisiskey");
        res.json({ token });
      } else {
        res.status(500).json({ message: "Credential does not match" });
      }
      res.send(result);
    } else {
      res.status(500).json("error");
    }
  } catch (error) {
    res.status(500).json("Login Error");
  }
});

module.exports = router;
