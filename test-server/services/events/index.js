require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const events = require("./handlers/event");
const { verifyAdmin } = require("../../middlewares/verifyToken");

const api = express();

mongoose.connect(
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
);

api.use(express.json({ limit: "10mb" }));

api.post("/api/events", verifyAdmin, events.createEvent);
api.put("/api/events/:id", verifyAdmin, events.updateEvent);
api.delete("/api/events/:id", verifyAdmin, events.deleteEvent);

api.get("/api/events/find/:id", events.getEvent);
api.get("/api/events", events.getSearchResults);
api.get("/api/events/type", events.getAllEvents);
api.get("/api/events/soonest", events.getSoonestEvent);

api.listen(process.env.EVENTS_PORT, (err) => {
  if (err) return console.log(err);
  console.log(
    `Events service succesfully started on port: "${process.env.EVENTS_PORT}...`
  );
});
