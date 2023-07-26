require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const tickets = require("./handlers/ticket");
const { verifyAdmin } = require("../../middlewares/verifyToken");

const api = express();
api.use(express.json({ limit: "10mb" }));

mongoose.connect(
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
);

api.get("/api/tickets/:userid/:status", tickets.getTickets);
api.delete("/api/tickets/delete/:id", tickets.removeCartItem);
api.post("/api/tickets/cart-item", tickets.createCartItem);

api.post("/api/tickets/purchase-ticket/:id", tickets.purchaseTicketsByUserId);
api.post("/api/tickets/use-ticket/:id", verifyAdmin, tickets.useQrCode);

api.listen(process.env.TICKETS_PORT, (err) => {
  if (err) return console.log(err);
  console.log(
    `Tickets service succesfully started on port: "${process.env.TICKETS_PORT}...`
  );
});
