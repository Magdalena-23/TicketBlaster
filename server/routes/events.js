const express = require("express");
const {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvent,
  getAllEvent,
} = require("../controllers/event");
const { verifyAdmin } = require("../middlewares/verifyToken");

const router = express.Router();

// Treba da verifikuvam admin pred da se pristapi do ova API
router.post("/", verifyAdmin, createEvent);
router.put("/:id", verifyAdmin, updateEvent);
router.delete("/:id", verifyAdmin, deleteEvent);

router.get("/find/:id", getEvent);
router.get("/", getAllEvent);

module.exports = router;
