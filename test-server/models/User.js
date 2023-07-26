const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    requied: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  // cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  // purchasedTickets: [
  //   {
  //     eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
  //     quantity: Number,
  //   },
  // ],
});

const User = new mongoose.model("User", userSchema);

module.exports = User;
