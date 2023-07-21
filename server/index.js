require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
const authRoute = require("./routes/auth");
const eventsRoute = require("./routes/events");
const usersRoute = require("./routes/users");
const ticketsRoute = require("./routes/tickets");
const uploadRoute = require("./routes/upload");
const path = require("path");

const api = express();

mongoose.connect(
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
);

api.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

api.use(express.json({ limit: "10mb" }));
api.use("/api/auth", authRoute);
api.use("/api/events", eventsRoute);
api.use("/api/users", usersRoute);
api.use("/api/tickets", ticketsRoute);
api.use("/api/upload-img", uploadRoute);

api.use(express.static(path.join(__dirname, "public")));

api.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

api.listen(process.env.PORT, (err) => {
  if (err) return console.log(err);
  console.log(`Server succesfully started on port: "${process.env.PORT}...`);
});
