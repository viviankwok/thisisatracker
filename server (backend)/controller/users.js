require("dotenv").config();

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuid } = require("uuid");

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

module.exports = router;
