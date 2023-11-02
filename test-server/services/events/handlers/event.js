const Event = require("../../../models/Event");
const RelatedEvent = require("../../../models/RelatedEvent");

const createEvent = async (req, res, next) => {
  try {
    const {
      artist,
      description,
      date,
      eventType,
      city,
      country,
      img,
      price,
      relatedEvents,
    } = req.body;

    // Convert the date string to a Date object
    const eventDate = new Date(date);

    // Create a new event
    const newEvent = new Event({
      artist,
      description,
      date: eventDate,
      eventType,
      city,
      country,
      img,
      price,
      relatedEvents: [],
    });

    const savedEvent = await newEvent.save();

    // Fetch and add the related events
    for (const relatedEventId of relatedEvents) {
      const relatedEvent = await RelatedEvent.findById(relatedEventId);
      if (relatedEvent) {
        relatedEvent.events.push(savedEvent._id);
        await relatedEvent.save();
      }
    }

    // Update the event with related events
    savedEvent.relatedEvents = relatedEvents;
    await savedEvent.save();

    res.status(201).json(savedEvent);
  } catch (error) {
    next(error);
  }
};

const updateEvent = async (req, res, next) => {
  try {
    const { date, ...rest } = req.body;

    const eventDate = new Date(date);

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: { ...rest, date: eventDate } },
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
    const currentDate = new Date();

    // Fetch the related events based on the IDs
    const relatedEvents = await Event.find({
      date: { $gte: currentDate },
      _id: { $in: event.relatedEvents },
    });

    // Combine the main event and related events into a single response
    const eventWithRelated = {
      ...event.toObject(),
      relatedEvents: relatedEvents,
    };

    res.status(200).json(eventWithRelated);
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

    if (type || limit) {
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
