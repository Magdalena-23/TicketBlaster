require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const auth = require("./handlers/auth");

const api = express();
api.use(express.json({ limit: "10mb" }));

mongoose.connect(
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
);

api.post("/api/auth/register", auth.register);
api.post("/api/auth/login", auth.login);
api.post("/api/auth/forgot-password", auth.forgotPassword);
api.post("/api/auth/reset-password", auth.resetPassword);

api.listen(process.env.AUTH_PORT, (err) => {
  if (err) return console.log(err);
  console.log(
    `Authentication service succesfully started on port: "${process.env.AUTH_PORT}...`
  );
});
