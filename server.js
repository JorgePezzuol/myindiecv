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

app.use(function (req, res, next) {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://myindiecv.herokuapp.com",
    "http://localhost:3000"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

app.use(require("./server/routes/AuthRoutes"));
app.use(require("./server/routes/UserRoutes"));
app.use(require("./server/routes/PersonalDetailsRoutes"));
app.use(require("./server/routes/ProfessionalSummaryRoutes"));
app.use(require("./server/routes/EmploymentRoutes"));
app.use(require("./server/routes/EducationRoutes"));
app.use(require("./server/routes/LinksRoutes"));
app.use(require("./server/routes/LanguageRoutes"));
app.use(require("./server/routes/SkillRoutes"));
app.use(require("./server/routes/FreeCvRoutes"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
