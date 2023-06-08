const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  artist: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  eventType: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  featured: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Event", eventSchema);
