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
      const result = await bcrypt.compare(req.body.password, user.hash);
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

      const response = { access, refresh };
      res.json(response);
    }
  } catch (error) {
    console.log("POST /users/login" + error);
    res.status(400).json({ status: "error", message: "Login failed" });
  }
});

router.post("/create", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user || req.body.password !== req.body.password1) {
      return res.status(400).json({
        status: "error",
        message: "Duplicate username or passwords do not match",
      });
    }
    const hash = await bcrypt.hash(req.body.password, 12);
    const createdUser = await User.create({
      email: req.body.email,
      hash,
      name: req.body.name,
      isAdmin: req.body.isAdmin,
    });
    console.log("create user: ", createdUser);
    res.json({ status: "ok", message: "user created" });
  } catch (error) {
    console.log("POST /create", error);
    res.status(400).json({ status: "error", message: "An error has occured" });
  }
});

router.get("/users", auth, async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (error) {
    console.log("GET /users", error);
    res.status(403).json({ status: "error", message: "an error has occurred" });
  }
});

router.get("/logout", auth, async (req, res) => {
  console.log("User Id", req.user._id);
  await User.findByIdAndRemove(req.user._id, (err, data) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: "User Logged Out" });
  });
});

module.exports = router;
