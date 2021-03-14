const express = require("express");
const cvModel = require("../models/CvModel");
const personalDetailsModel = require("../models/PersonalDetailsModel");
const professionalSummaryModel = require("../models/ProfessionalSummaryModel");
const auth = require("../auth/auth");
const app = express();
const { ObjectId } = require("mongodb");

// remember to check if the cv is really from the user
app.post("/cv/:cvId", async (req, res) => {
  try {
    const cv = await cvModel.findOne({
      _id: ObjectId(req.params.cvId),
    });
    if (cv.user.toString() !== req.body.user.toString()) {
      return res.status(401).send(err);
    }

    const personalDetails = await personalDetailsModel.findOne({
      cv: ObjectId(req.params.cvId),
    });
    const professionalSummary = await professionalSummaryModel.findOne({
      cv: ObjectId(req.params.cvId),
    });

    res.send({
      personalDetails: personalDetails,
      professionalSummary: professionalSummary,
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/cv/user/:userId", async (req, res) => {
  try {
    const cv = await cvModel.find({
      user: ObjectId(req.params.userId),
    });
    res.send(cv);
  } catch (err) {
    res.status(500).send(err);
  }
});

// CREATE CV AND RETURN THE OBJECTID
// DONT FORGOT TO CREATE ALL THE NECESSARY COLLECTIONS
// personal details, professional summaries, etc
app.post("/cv/create", async (req, res) => {
  const cv = new cvModel(req.body);
  try {
    await cv.save();
    res.send(cv);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app;
