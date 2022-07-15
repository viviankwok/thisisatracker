// require env
require("dotenv").config();

// set-up express
const express = require("express");
const app = express();
const cors = require("cors");

// connect db
const connectDB = require("./db/db");
connectDB(process.env.MONGODB_URI);
// already in "./db/db.js"
// const mongoose = require("mongoose");
// const db = mongoose.connection;

// set-up middleware
// cors
app.use(cors());
// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// controller
const recipesController = require("./controller/recipes");
const usersController = require("./controller/users");
app.use("/recipes", recipesController);
app.use("/users", usersController);

// listen to PORT
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`server started at port: ${PORT}`));
