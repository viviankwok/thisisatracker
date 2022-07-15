const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    hash: {
      type: String,
      required: true,
    },
    isAdmin: Boolean,
  },
  // storage location
  { collection: "users" }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
