const express = require("express");
const health = express.Router({});
health.get("/", async (_req, res, _next) => {
  const health = {
    message: "OK",
  };
  try {
    res.send(health);
  } catch (error) {
    healthcheck.message = error;
    res.status(503).send();
  }
});
module.exports = health;
