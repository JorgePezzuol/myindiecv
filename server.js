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
mongoose.set("useFindAndModify", false);

app.use(
  cors({
    origin: [`${process.env.FRONT_END_URL}`, "http://localhost:3000"],
    credentials: true,
  })
);

// remember to put /api before all
app.use(require("./server/routes/AuthRoutes"));
app.use(require("./server/routes/UserRoutes"));
app.use(require("./server/routes/PersonalDetailsRoutes"));
app.use(require("./server/routes/ProfessionalSummaryRoutes"));
app.use(require("./server/routes/CvRoutes"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
