const express = require("express");
const path = require("path");
require("dotenv").config();
const app = express();

if (process.env.NODE_ENV === "prod") {
  app.use(express.static(path.join(__dirname, "client", "build")));
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "client", "index.html"));
});


app.listen(3001, () => {
  console.log("Running on port 3001");
});
