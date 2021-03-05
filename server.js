const express = require("express");
const path = require("path");
require("dotenv").config();
const app = express();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "client", "index.html"));
});

const PORT = process.env.PORT || 80;

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
