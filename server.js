const express = require("express");
const server = express();
const port = process.env.PORT || 8000;
server.get("/", (req, res) =>
  res.status(200).json({ message: "Server is running" })
);

module.exports = server;
