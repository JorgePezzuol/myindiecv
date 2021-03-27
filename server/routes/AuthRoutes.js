const auth = require("../auth/auth");
const express = require("express");
const app = express();

app.get("/api/authenticateToken", async (req, res) => {
  auth.authenticateToken(req, res);
});

module.exports = app;
