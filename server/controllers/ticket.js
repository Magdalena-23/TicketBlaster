const Ticket = require("../models/Ticket");
const QrCode = require("../models/QrCode");

const createCartItem = async (req, res) => {
  try {
    const { event, user } = req.body;
    const existingCartItem = await Ticket.findOne({
      event,
      user,
      isPurchased: false,
    });

    if (existingCartItem) {
      existingCartItem.quantity += req.body.quantity;
      await existingCartItem.save();
      res.status(200).send(existingCartItem);
    } else {
      const cartItem = new Ticket({ ...req.body });
      await cartItem.save();
      res.status(200).send(cartItem);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const purchaseTicketsByUserId = async (req, res) => {
  try {
    const newQRCode = new QrCode({
      hashCode: "Test UUID",
      isUsed: false,
    });
    await newQRCode.save();
    const ticket = await Ticket.findOneAndUpdate(
      { userID: req.params.userId, isPurchased: false },
      {
        isPurchased: true,
        qrCode: newQRCode._id,
      },
      { new: true }
    );

    if (!ticket) {
      return res.status(404).send("Ticket not found");
    }

    res.status(200).send(ticket);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const useQrCode = async (req, res) => {
  try {
    const qrCode = await QrCode.findByIdAndUpdate(
      req.params.id,
      {
        isUsed: true,
      },
      { new: true }
    );
    res.status(200).json(qrCode);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const getTickets = async (req, res) => {
  const { userid, status } = req.params;
  try {
    const query = {
      user: userid,
      isPurchased: status,
    };
    const tickets = await Ticket.find(query)
      .populate("event")
      .populate("qrCode");
    res.status(200).send(tickets);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const removeCartItem = async (req, res) => {
  try {
    await Ticket.deleteOne({ _id: req.params.id });
    res.status(200).send("Item deleted from cart");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getTickets,
  removeCartItem,
  createCartItem,
  purchaseTicketsByUserId,
  useQrCode,
};
