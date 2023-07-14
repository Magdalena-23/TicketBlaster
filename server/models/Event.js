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
  price: {
    type: Number,
    required: true,
  },
  relatedEvents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RelatedEvent",
    },
  ],
});

module.exports = mongoose.model("Event", eventSchema);
