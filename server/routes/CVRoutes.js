const express = require("express");
const cvModel = require("../models/CvModel");
const personalDetailsModel = require("../models/PersonalDetailsModel");
const professionalSummaryModel = require("../models/ProfessionalSummaryModel");
const employmentModel = require("../models/EmploymentModel");
const educationModel = require("../models/EducationModel");
const auth = require("../auth/auth");
const jwt = require("jsonwebtoken");
const app = express();
const { ObjectId } = require("mongodb");
const dotenv = require("dotenv");
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

    res.send({
      name: cv.name,
      personalDetails: personalDetails,
      professionalSummary: professionalSummary,
      employmentList: employmentList,
      educationList: educationList,
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

// CREATE CV AND RETURN THE OBJECTID
// DONT FORGOT TO CREATE ALL THE NECESSARY COLLECTIONS
// personal details, professional summaries, etc
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

module.exports = app;
