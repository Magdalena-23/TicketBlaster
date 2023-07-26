require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const { uploadImage } = require("./handlers/upload");
const { upload } = require("../../middlewares/upload");

const api = express();

mongoose.connect(
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
);

api.use(express.json({ limit: "10mb" }));
api.use(express.static(path.join(__dirname, "public")));

api.post("/api/upload-img", upload.single("image"), uploadImage);

api.listen(process.env.UPLOAD_PORT, (err) => {
  if (err) return console.log(err);
  console.log(
    `Upload service succesfully started on port: "${process.env.UPLOAD_PORT}...`
  );
});
