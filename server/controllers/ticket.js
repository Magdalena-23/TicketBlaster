const Ticket = require("../models/Ticket");

const getTickets = async (req, res) => {
  const { userid, status } = req.params;
  try {
    const query = {
      user: userid,
      isPurchased: status,
    };
    const tickets = await Ticket.find(query).populate("event");
    res.status(200).send(tickets);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getTickets,
};
