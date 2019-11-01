const express = require("express");
const actModel = require("../data/helpers/actionModel");
const router = express.Router();
const { get, insert, update, remove } = actModel;

module.exports = router;