const express = require("express");
const {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvent,
  getAllEvents,
  getSearchResults,
  getSoonestEvent,
} = require("../controllers/event");
const { verifyAdmin } = require("../middlewares/verifyToken");

const router = express.Router();

router.post("/", verifyAdmin, createEvent);
router.put("/:id", verifyAdmin, updateEvent);
router.delete("/:id", verifyAdmin, deleteEvent);

router.get("/find/:id", getEvent);
router.get("/", getSearchResults);
router.get("/type", getAllEvents);
router.get("/soonest", getSoonestEvent);

module.exports = router;
