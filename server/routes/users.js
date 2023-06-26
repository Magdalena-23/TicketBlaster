const express = require("express");
const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  getPurchasedEvents,
} = require("../controllers/users");
const { verifyAdmin, verifyUser } = require("../middlewares/verifyToken");
const router = express.Router();

router.get("/", verifyAdmin, getAllUsers);

router.get("/:id", verifyUser, getUser);
router.get("/tickets/:id", getPurchasedEvents);
router.put("/:id", verifyUser, updateUser);
router.delete("/:id", verifyUser, deleteUser);

module.exports = router;
