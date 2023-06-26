const User = require("../models/User");
const bcrypt = require("bcryptjs");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const updateUser = async (req, res) => {
  try {
    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      req.body.password = hashedPassword;
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).send(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send("User deleted");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const getPurchasedEvents = async (req, res) => {
  try {
    const userId = req.params.id; // User ID for which to retrieve purchased events

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    const purchasedEvents = user.purchasedTickets.map(
      (ticket) => ticket.eventId
    );

    res.status(200).json(purchasedEvents);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  getPurchasedEvents,
};
