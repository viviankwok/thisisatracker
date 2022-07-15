require("dotenv").config();

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuid } = require("uuid");

const Recipes = require("../models/Recipe");
const auth = require("../middleware/auth");

router.get("/testing", async (req, res) => {
  try {
    res.send("yes it works");
  } catch (error) {
    console.log(error);
    res.send("got error ");
  }
});

module.exports = router;
