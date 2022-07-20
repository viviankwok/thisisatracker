require("dotenv").config();

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuid } = require("uuid");

const Recipe = require("../models/Recipe");
const auth = require("../middleware/auth");
const User = require("../models/User");
const { check, validationResult } = require("express-validator");

// TESTING (for dev purposes)
router.post("/testing", async (req, res) => {
  console.log("GET /testing route activated");
  console.log("req.body.text NEW ", req.body.meatTags);
  console.log("req.body.text NEW ", req.body.vegTags);
  console.log("req.body.text NEW ", req.body.tags);

  try {
    res.json("yes it works");
  } catch (error) {
    console.log(error);
    res.json("got error");
  }
});

// SEED (for dev purposes)
router.post("/seed", async (req, res) => {
  try {
    Recipe.collection.drop();

    // for reference
    const meat = ["chicken", "beef", "pork", "impossible meat"];
    const veg = ["lettuce", "tomato", "cabbage", "baby spinach"];
    const tags = ["healthy", "quick", "easy", "refreshing"];

    const initRecipe = [
      {
        name: "avocado sandwhich",
        meat: ["impossible meat"],
        veg: ["lettuce", "cucumber", "tomatoes"],
        calories: 195,
        instructions: "Slice avocado and sandwich it.",
        prepTime: 5,
        tags: ["healthy", "refreshing", "easy"],
      },
      {
        name: "banana sandwhich",
        meat: ["beef"],
        veg: ["lettuce", "baby spinach"],
        calories: 165,
        instructions: "Take banana and sandwich it.",
        prepTime: 5,
        tags: ["healthy", "easy"],
      },
      {
        name: "coconut paprika chicken",
        meat: ["chicken"],
        veg: ["baby spinach"],
        calories: 292,
        instructions: "Combine coconut, paprika and chicken.",
        prepTime: 25,
        tags: ["healthy", "quick"],
      },
    ];

    await Recipe.create(initRecipe);
    res.status(200).json({ status: "ok!", message: "seeding completed." });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      status: "error",
      message: "An error occured.",
    });
  }
});

// GET ALL
// router.get("/recipes", auth, async (req, res) => {
router.get("/recipes", auth, async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
});

// GET ONE
router.post("/recipe", auth, async (req, res) => {
  const recipe = await Recipe.findOne({ _id: req.body.id });
  res.json(recipe);
});

// CREATE
router.post(
  "/create",
  auth,
  [
    // all fields exceipt instructions are required
    check("name", "Name is required.").not().isEmpty(),
    check("meat", "Please select a protein.").not().isEmpty(),
    check("veg", "Veg is required.").not().isEmpty(),
    check("tags", "Please select all tags that apply.").not().isEmpty(),
  ],
  async (req, res) => {
    try {
      const newRecipe = Recipe.create(req.body);
      console.log(`new recipe created: ${newRecipe}`);
      res.json("Recipe created.");
    } catch (error) {
      console.log(error);
      res.status(400).json({ status: 400, message: "An error has occurred." });
    }
  }
);

// FILTER
router.post("/filter", auth, async (req, res) => {
  console.log("POST /filter route activated");

  try {
    // search criteria: any tags AND any meatTags AND any vegTags
    // does not work if any of the req.body.tags/meatTags/vegTags are empty
    const recipes = await Recipe.find({
      tags: { $elemMatch: { $in: req.body.tags } },
      meat: { $elemMatch: { $in: req.body.meatTags } },
      veg: { $elemMatch: { $in: req.body.vegTags } },
    });

    res.json(recipes);
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      status: "error",
      message: "An error occured.",
    });
  }
});

// UDPATE/EDIT - admin only
router.patch("/edit", auth, async (req, res) => {
  console.log("req.decoded.isAdmin: ", req.decoded.isAdmin);

  try {
    // if user IS admin => search and edit db
    if (req.decoded.isAdmin) {
      const recipe = await Recipe.find({ _id: req.body.id });
      await Recipe.updateOne(
        { _id: req.body.id },
        {
          $set: {
            name: req.body.name || recipe.name,
            meat: req.body.meat || recipe.meat,
            calories: req.body.calories || recipe.calories,
            instructions: req.body.instructions || recipe.instructions,
            prepTime: req.body.prepTime || recipe.prepTime,
            tags: req.body.tags || recipe.tags,
          },
        }
      );
      res.status(200).json({ status: "ok!", message: "recipe edited." });
    } else {
      // if user is NOT admin => display error message
      console.log(error);
      return res.status(401).json({
        status: "error",
        message: "Unauthorised to edit. Don't anyhow try.",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      status: "error",
      message: "An error occured.",
    });
  }
});

// DELETE - admin only
router.delete("/delete", auth, async (req, res) => {
  console.log("DELETE /delete path activated");
  console.log("req.decoded.isAdmin: ", req.decoded.isAdmin);

  try {
    if (req.decoded.isAdmin) {
      await Recipe.deleteOne({ _id: req.body.id });
      res.json({ status: "ok!", message: "Recipe deleted." });
    } else {
      console.log(error);
      return res.status(401).json({
        status: "error",
        message: "Unauthorised to edit. Don't anyhow try.",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      status: "error",
      message: "An error occured.",
    });
  }
});

module.exports = router;
