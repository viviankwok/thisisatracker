require("dotenv").config();

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuid } = require("uuid");

const Recipe = require("../models/Recipe");
const auth = require("../middleware/auth");
const User = require("../models/User");

router.get("/testing", async (req, res) => {
  try {
    res.send("yes it works");
  } catch (error) {
    console.log(error);
    res.send("got error ");
  }
});

// viv - filter, edit, delete

// GET (=> filter)
router.post("/recipe", async (req, res) => {
  try {
    const recipe = await Recipe.find({ _id: req.body.id });
    res.send(recipe);
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      status: "error",
      message: "An error occured.",
    });
  }
});

// SEED
router.post("/seed", async (req, res) => {
  try {
    Recipe.collection.drop();
    const initRecipe = [
      {
        name: "avocado sandwhich",
        meat: ["impossible meat"],
        veg: ["lettuce", "cucumber", "tomatoes"],
        calories: 450,
        instructions: "Take avocado and sandwhich it.",
        prepTime: 5,
        tags: ["healthy", "delicious", "easy", "avocado", "lovely", "hahaha"],
      },
      {
        name: "banana sandwhich",
        meat: ["chicken"],
        veg: ["lettuce", "olives", "cabbage"],
        calories: 450,
        instructions: "Take banana and sandwhich it.",
        prepTime: 5,
        tags: ["healthy", "yellow outside", "white inside", "peel", "hahaha"],
      },
      {
        name: "coconut paprika chicken",
        meat: ["chicken"],
        veg: ["baby spinach"],
        calories: 450,
        instructions: "Add coconut and paprika to chicken",
        prepTime: 25,
        tags: ["healthy", "orange", "beautiful", "tasty", "coconut"],
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

// UDPATE/EDIT - with fake auth
router.patch("/edit", async (req, res) => {
  const isAdmin = true;
  try {
    // if user IS admin => search and edit db
    if (isAdmin) {
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

// DELETE
router.delete("/delete", async (req, res) => {
  try {
    await Recipe.deleteOne({ _id: req.body.id });
    res.json({ status: "ok!", message: "Recipe deleted." });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      status: "error",
      message: "An error occured.",
    });
  }
});

// // FILTER
router.post("/filter", async (req, res) => {
  try {
    // search criteria: any tags AND any meatTags AND any vegTags
    // does not work if any of the req.body.tags/meatTags/vegTags are empty
    const recipes = await Recipe.find({
      tags: { $elemMatch: { $in: req.body.tags } },
      meat: { $elemMatch: { $in: req.body.meatTags } },
      veg: { $elemMatch: { $in: req.body.vegTags } },
    });
    console.log(`req.body.tags: ${req.body.tags}`);
    console.log(`req.body.meatTags: ${req.body.meatTags}`);
    console.log(`req.body.vegTags: ${req.body.vegTags}`);

    res.json(recipes);
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      status: "error",
      message: "An error occured.",
    });
  }
});

module.exports = router;
