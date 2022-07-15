//  DATA STRUCTURE

// db: thisisatracker / collection: recipes
const recipesData = {
  // default ID in mongoDB
  id: "5a18c6e82737dc8b317a46dc",
  name: "avocado sandwhich",
  meat: "beef",
  veg: false,
  calories: 0,
  carb: "rice",
  // vegetarian properly; boolean
  vegetarian: true,
  instructions: "preparation instructions",
  // number in minutes
  preparationTime: 20,
  flavourProfile: ["spicy", "sweet", "savory", "unami"],
  tags: ["dairy", "vegan", "keto", "healthy", "delicious"],
};
// const results = Recipe.find({tags: "healthy"}, {calories: $gt 500})
// res.send(results)

// db: thisisatracker / collection: users
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    hash: {
      type: String,
      required: true,
    },
  },

  // storage location
  { collection: "users" }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
