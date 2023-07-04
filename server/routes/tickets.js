const express = require("express");
const { getTickets } = require("../controllers/ticket");

const router = express.Router();

router.get("/:userid/:status", getTickets);

module.exports = router;
