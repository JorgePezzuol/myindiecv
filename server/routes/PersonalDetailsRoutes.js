const express = require("express");
const personalDetailsModel = require("../models/PersonalDetailsModel");
const auth = require("../auth/auth");
const app = express();
const { ObjectId } = require("mongodb");

app.get("/api/personaldetails/cv/:cvId", async (req, res) => {
  try {
    const personalDetails = await personalDetailsModel.findOne({
      cv: ObjectId(req.params.cvId),
    });
    res.send(personalDetails);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/api/personaldetails/:id", async (req, res) => {
  try {
    const personalDetails = await personalDetailsModel.findOne({
      _id: ObjectId(req.params.id),
    });
    res.send(personalDetails);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/api/personaldetails", async (req, res) => {
  const personalDetails = new personalDetailsModel(req.body);
  try {
    await personalDetails.save();
    res.send(personalDetails);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.patch("/api/personaldetails/:id", async (req, res) => {
  try {
    await personalDetailsModel.findOneAndUpdate(
      {
        _id: ObjectId(req.params.id),
      },
      req.body
    );
    const personalDetails = await personalDetailsModel.findOne({
      _id: ObjectId(req.params.id),
    });
    res.send(personalDetails);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete("/api/personaldetails/:id", async (req, res) => {
  try {
    const personalDetails = await personalDetailsModel.findOne({
      _id: ObjectId(req.params.id),
    });
    await personalDetails.remove();
    res.send({ message: "Deleted personal details" });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app;
