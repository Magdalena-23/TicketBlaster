const Event = require("../models/Event");

const createEvent = async (req, res, next) => {
  try {
    const newEvent = new Event(req.body);
    const savedEvent = await newEvent.save();
    res.status(200).json(savedEvent);
  } catch (err) {
    next(err);
  }
};

const updateEvent = async (req, res, next) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedEvent);
  } catch (err) {
    next(err);
  }
};

const deleteEvent = async (req, res, next) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.status(200).json("Event has been deleted");
  } catch (err) {
    next(err);
  }
};

const getEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    res.status(200).json(event);
  } catch (err) {
    next(err);
  }
};

const getSearchResults = async (req, res, next) => {
  try {
    const { search } = req.query;
    const searchRegex = new RegExp(search, "i");

    const searchResults = await Event.find({
      $or: [{ artist: searchRegex }, { description: searchRegex }],
    });

    res.status(200).json(searchResults);
  } catch (err) {
    next(err);
  }
};

const getSoonestEvent = async (req, res, next) => {
  try {
    const { limit } = req.query;
    const currentDate = new Date();

    const soonestEvent = await Event.find({
      date: { $gte: currentDate },
    })
      .sort({ date: 1 })
      .limit(limit);

    res.status(200).json(soonestEvent);
  } catch (err) {
    next(err);
  }
};

const getAllEvents = async (req, res, next) => {
  try {
    const { type, limit } = req.query;
    const currentDate = new Date();
    let upcomingEvents;

    if (type && limit) {
      upcomingEvents = await Event.find({
        eventType: type,
        date: { $gte: currentDate },
      })
        .sort({ date: 1 })
        .limit(limit);
    } else {
      upcomingEvents = await Event.find({});
    }

    if (upcomingEvents.length === 0) {
      return res.status(404).json({ message: "No upcoming events found." });
    }

    res.status(200).json(upcomingEvents);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvent,
  getAllEvents,
  getSearchResults,
  getSoonestEvent,
};
