const express = require("express");
const {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvent,
  getAllEvent,
} = require("../controllers/event");

const router = express.Router();

// Treba da verifikuvam admin pred da se pristapi do ova API
router.post("/", createEvent);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

router.get("/find/:id", getEvent);
router.get("/", getAllEvent);

module.exports = router;
