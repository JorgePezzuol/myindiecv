const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(cookieParser());

require("dotenv").config();

mongoose.connect(process.env.DATABASE_ACCESS, {
  useNewUrlParser: true,
});

app.use(
  cors({
    origin: [
      `${process.env.FRONT_END_URL}`,
      "http://localhost:3000",
      "https://mypage.com",
    ],
    credentials: true,
  })
);

const userRouter = require("./server/routes/UserRoutes");
const authRouter = require("./server/routes/AuthRoutes");

app.use(userRouter);
app.use(authRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
