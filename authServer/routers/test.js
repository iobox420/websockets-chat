const express = require("express");

module.exports = express.Router().get("", (req, res) => {
  res.send("hello from exported router");
});
