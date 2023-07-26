const Ticket = require("../models/Ticket");
// const QrCode = require("../models/QrCode");

const purchaseTicketsByUserId = async (req, res, next) => {
  const { token, amount } = req.body;
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  try {
    if (!token || !amount) {
      return res.status(400).json({ error: "Missing payment information." });
    }

    const charge = await stripe.charges.create({
      amount: amount,
      currency: "USD",
      source: token,
      description: "Payment for events",
    });

    res.status(200).json({ success: true, message: "Payment successful!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Payment failed." });
  }
};

module.exports = {
  purchaseTicketsByUserId,
};
