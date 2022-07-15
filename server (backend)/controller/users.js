require("dotenv").config();

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const User = require("../models/User");
const auth = require("../middleware/auth");

router.get("/testing", async (req, res) => {
  try {
    res.send("user controller works!");
  } catch (error) {
    console.log(error);
    res.send("got error");
  }
});

router.post("/login", async (req, res) => {
  try {
    // find if user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(400)
        .json({ status: "error", message: "User not found" });
    } else {
      // user exists, compare hash with password input
      const result = await bcrypt.compare(user.hash, req.body.password);
      if (!result) {
        console.log("username or password error");
        return res
          .status(401)
          .json({ status: "error", message: "Password does not match" });
      }

      const payload = {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
      };

      const access = jwt.sign(payload, process.env.ACCESS_SECRET, {
        expiresIn: "20m",
        jwtid: uuidv4(),
      });

      const refresh = jwt.sign(payload, process.env.REFRESH_SECRET, {
        expiresIn: "30d",
        jwtid: uuidv4(),
      });

      const response = (access, refresh);
      res.json(response);
    }
  } catch (error) {
    console.log("POST /login" + error);
    res.status(400).json({ status: "error", message: "Login failed" });
  }
});
module.exports = router;
