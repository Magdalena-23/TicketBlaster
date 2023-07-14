const mongoose = require("mongoose");

const relatedEventSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
});

module.exports = mongoose.model("RelatedEvent", relatedEventSchema);
