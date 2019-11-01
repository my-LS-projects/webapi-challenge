const express = require("express");
const server = express();
const helmet = require("helmet");
const projectRouter = require('./routers/project-routes')

server.use(express.json());
server.use(helmet());

server.use('/api/projects/', projectRouter)

server.get("/", (req, res) =>
  res.status(200).json({ message: "Server is running" })
);

module.exports = server;
