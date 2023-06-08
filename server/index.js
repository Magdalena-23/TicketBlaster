require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const authRoute = require("./routes/auth");

const api = express();

mongoose.connect(
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
);

api.use(express.json());
api.use("/api/auth", authRoute);

api.listen(process.env.PORT, (err) => {
  if (err) return console.log(err);
  console.log(`Server succesfully started on port: "${process.env.PORT}...`);
});
