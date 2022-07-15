const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    meat: Array,
    veg: Array,
    calories: { type: Number, required: true },
    instructions: String,
    prepTime: Number,
    tags: [{ type: String }],
  },
  { timestamps: true },
  // storage location
  { collection: "recipes" }
);

const Recipe = mongoose.model("Recipe", RecipeSchema);
module.exports = Recipe;
