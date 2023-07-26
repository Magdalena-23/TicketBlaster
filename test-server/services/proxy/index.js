require("dotenv").config();
const cors = require("cors");
const express = require("express");
const proxy = require("express-http-proxy");
const path = require("path");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use((req, res, next) => {
  console.log("Request URL:", req.originalUrl);
  next();
}, express.static(path.join(__dirname, "..", "..", "public")));

app.use(
  "/api/auth",
  proxy("http://127.0.0.1:8001", {
    proxyReqPathResolver: (req) => {
      const resolvedPath = `/api/auth${req.url}`;
      return resolvedPath;
    },
  })
);

app.use(
  "/api/events",
  proxy("http://127.0.0.1:8002", {
    proxyReqPathResolver: (req) => {
      const resolvedPath = `/api/events${req.url}`;
      return resolvedPath;
    },
  })
);

app.use(
  "/api/users",
  proxy("http://127.0.0.1:8003", {
    proxyReqPathResolver: (req) => {
      const resolvedPath = `/api/users${req.url}`;
      return resolvedPath;
    },
  })
);

app.use(
  "/api/tickets",
  proxy("http://127.0.0.1:8004", {
    proxyReqPathResolver: (req) => {
      const resolvedPath = `/api/tickets${req.url}`;
      return resolvedPath;
    },
  })
);

app.use(
  "/api/upload-img",
  proxy("http://127.0.0.1:8005", {
    proxyReqPathResolver: (req) => {
      const resolvedPath = `/api/upload-img${req.url}`;
      return resolvedPath;
    },
  })
);

app.use(
  "/api/payment",
  proxy("http://127.0.0.1:8006", {
    proxyReqPathResolver: (req) => {
      const resolvedPath = `/api/payment${req.url}`;
      return resolvedPath;
    },
  })
);

app.listen(process.env.PORT, (err) => {
  if (err) return console.log(err);
  console.log(
    `Proxy service succesfully started on port: "${process.env.PORT}...`
  );
});
