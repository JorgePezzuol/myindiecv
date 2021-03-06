const express = require("express");
const cvModel = require("../models/CvModel");
const personalDetailsModel = require("../models/PersonalDetailsModel");
const professionalSummaryModel = require("../models/ProfessionalSummaryModel");
const userModel = require("../models/UserModel");
const linksModel = require("../models/LinksModel");
const employmentModel = require("../models/EmploymentModel");
const educationModel = require("../models/EducationModel");
const languageModel = require("../models/LanguageModel");
const skillModel = require("../models/SkillModel");
const auth = require("../auth/auth");
const jwt = require("jsonwebtoken");
const puppeteer = require("puppeteer");
const app = express();
const { ObjectId } = require("mongodb");
const dotenv = require("dotenv");
const UserModel = require("../models/UserModel");
dotenv.config();

// remember to check if the cv is really from the user
app.get("/api/cv/edit/:cvId", async (req, res) => {
  try {
    const cv = await cvModel.findOne({
      _id: ObjectId(req.params.cvId),
    });

    let userId = 0;
    jwt.verify(
      req.cookies.token,
      process.env.ACCESS_TOKEN_SECRET,
      (err, userDecoded) => {
        if (!err) {
          userId = userDecoded._id;
        }
      }
    );

    // if (cv.user.toString() !== userId) {
    //   return res.status(401).send(err);
    // }

    const personalDetails = await personalDetailsModel.findOne({
      cv: ObjectId(req.params.cvId),
    });
    const professionalSummary = await professionalSummaryModel.findOne({
      cv: ObjectId(req.params.cvId),
    });
    const educationList = await educationModel.find({
      cv: ObjectId(req.params.cvId),
    });
    const employmentList = await employmentModel.find({
      cv: ObjectId(req.params.cvId),
    });
    const socialLinksList = await linksModel.find({
      cv: ObjectId(req.params.cvId),
    });
    const languageList = await languageModel.find({
      cv: ObjectId(req.params.cvId),
    });
    const skillList = await skillModel.find({
      cv: ObjectId(req.params.cvId),
    });

    await cvModel.findOneAndUpdate(
      {
        _id: ObjectId(req.params.cvId),
      },
      {
        lastUpdated: new Date(),
      }
    );

    res.send({
      name: cv.name,
      _id: cv._id,
      lastUpdated: cv.lastUpdated,
      personalDetails: personalDetails,
      professionalSummary: professionalSummary,
      employmentList: employmentList,
      educationList: educationList,
      socialLinksList: socialLinksList,
      languageList: languageList,
      skillList: skillList,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

app.get("/api/cv/user", async (req, res) => {
  try {
    let userId = 0;
    jwt.verify(
      req.cookies.token,
      process.env.ACCESS_TOKEN_SECRET,
      (err, userDecoded) => {
        if (!err) {
          userId = userDecoded._id;
        }
      }
    );
    const cvs = await cvModel.find({
      user: ObjectId(userId),
    });
    res.send(cvs);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/api/cv/create", async (req, res) => {
  try {
    let userId = 0;
    jwt.verify(
      req.cookies.token,
      process.env.ACCESS_TOKEN_SECRET,
      (err, userDecoded) => {
        if (!err) {
          userId = userDecoded._id;
        }
      }
    );

    const cv = new cvModel({
      user: ObjectId(userId),
    });
    await cv.save();

    const personalDetails = new personalDetailsModel({
      cv: ObjectId(cv._id),
      jobTitle: "",
      firstName: "",
      lastName: "",
      mail: "",
      phone: "",
    });
    await personalDetails.save();

    const professionalSummary = new professionalSummaryModel({
      cv: ObjectId(cv._id),
      description: "",
    });
    await professionalSummary.save();

    res.send({
      _id: cv._id,
      personalDetails: personalDetails,
      professionalSummary: professionalSummary,
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.patch("/api/cv/:cvId", async (req, res) => {
  try {
    await cvModel.findOneAndUpdate(
      {
        _id: ObjectId(req.params.cvId),
      },
      req.body
    );
    res.status(200).send({ message: "CV Updated" });
  } catch (err) {
    res.status(500).send(err);
  }
});

// check owner of cv
app.get("/api/export/pdf/:cvId", async (req, res) => {
  const cv = await cvModel.findOne({
    _id: ObjectId(req.params.cvId),
  });

  const user = await UserModel.findOne({
    _id: ObjectId(cv.user),
  });

  const fileName = user.firstName + " " + user.lastName;

  (async () => {
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto(
      `https://myindiecv.herokuapp.com/cv/print/${req.params.cvId}`,
      {
        waitUntil: ["domcontentloaded", "load", "networkidle0"],
      }
    );
    const buffer = await page.pdf({
      printBackground: true,
      filename: fileName,
      format: "a3",
      PreferCSSPageSize: true,
    });
    res.type("application/pdf");
    res.send(buffer);
    await browser.close();
  })();
});

app.delete("/api/cv/:cvId", async (req, res) => {
  try {
    await cvModel.remove({
      _id: ObjectId(req.params.cvId),
    });
    res.send({ message: "CV has been deleted" });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app;
