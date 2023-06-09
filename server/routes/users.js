const express = require("express");
const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");
const { verifyAdmin, verifyUser } = require("../middlewares/verifyToken");
const router = express.Router();

router.get("/", verifyAdmin, getAllUsers);

router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", verifyUser, deleteUser);

module.exports = router;
