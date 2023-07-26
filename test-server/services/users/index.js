require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const users = require("./handlers/user");
const { verifyAdmin, verifyUser } = require("../../middlewares/verifyToken");

const api = express();
api.use(express.json({ limit: "10mb" }));

mongoose.connect(
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
);

api.get("/api/users", verifyAdmin, users.getAllUsers);
api.get("/api/users/:id", verifyUser, users.getUser);
api.put("/api/users/:id", verifyUser, users.updateUser);
api.patch("/api/users/soft-delete/:id", verifyAdmin, users.softDeleteUser);
api.patch("/api/users/role/:id", verifyAdmin, users.changeUserRole);

api.listen(process.env.USERS_PORT, (err) => {
  if (err) return console.log(err);
  console.log(
    `Users service succesfully started on port: "${process.env.USERS_PORT}...`
  );
});
