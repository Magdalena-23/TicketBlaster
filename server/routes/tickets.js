const express = require("express");
const {
  getTickets,
  removeCartItem,
  createCartItem,
  purchaseTicketsByUserId,
  useQrCode,
} = require("../controllers/ticket");
const { verifyAdmin } = require("../middlewares/verifyToken");

const router = express.Router();

router.get("/:userid/:status", getTickets);
router.delete("/delete/:id", removeCartItem);
router.post("/cart-item", createCartItem);

router.post("/purchase-ticket/:id", purchaseTicketsByUserId);
router.post("/use-ticket/:id", verifyAdmin, useQrCode);

module.exports = router;
