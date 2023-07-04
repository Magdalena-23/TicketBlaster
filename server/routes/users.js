const express = require("express");
const {
  getAllUsers,
  getUser,
  updateUser,
  softDeleteUser,
  // getPurchasedEvents,
  changeUserRole,
} = require("../controllers/users");
const { verifyAdmin, verifyUser } = require("../middlewares/verifyToken");
const router = express.Router();

router.get("/", verifyAdmin, getAllUsers);

router.get("/:id", verifyUser, getUser);
// router.get("/tickets/:id", getPurchasedEvents);
router.put("/:id", verifyUser, updateUser);
router.patch("/soft-delete/:id", verifyAdmin, softDeleteUser);
router.patch("/role/:id", verifyAdmin, changeUserRole);

module.exports = router;
