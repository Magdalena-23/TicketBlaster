const express = require("express");
const router = express.Router();
const { uploadImage } = require("../controllers/upload");
const { upload } = require("../middlewares/upload");

router.post("/", upload.single("image"), uploadImage);

module.exports = router;
