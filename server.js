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

// app.use(
//   cors({
//     origin: [
//       `${process.env.FRONT_END_URL}`,
//       "http://localhost:3000, http://localhost:5000",
//     ],
//     credentials: false,
//   })
// );

// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

// links related to pdf generator (puppeteer)
// https://github.com/marcbachmann/node-html-pdf/issues/49
// https://www.youtube.com/watch?v=azOE6wH-cok&ab_channel=RaddyTheBrand

// remember to put /api before all
app.use(require("./server/routes/AuthRoutes"));
app.use(require("./server/routes/UserRoutes"));
app.use(require("./server/routes/PersonalDetailsRoutes"));
app.use(require("./server/routes/ProfessionalSummaryRoutes"));
app.use(require("./server/routes/EmploymentRoutes"));
app.use(require("./server/routes/EducationRoutes"));
app.use(require("./server/routes/LinksRoutes"));
app.use(require("./server/routes/LanguageRoutes"));
app.use(require("./server/routes/SkillRoutes"));
app.use(require("./server/routes/CvRoutes"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
