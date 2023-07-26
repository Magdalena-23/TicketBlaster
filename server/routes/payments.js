const express = require("express");
const { purchaseTicketsByUserId } = require("../controllers/payment");

const router = express.Router();

router.post("/process-payment/:id", purchaseTicketsByUserId);

module.exports = router;
