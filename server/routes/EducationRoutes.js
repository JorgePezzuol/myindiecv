const express = require("express");
const educationModel = require("../models/EducationModel");
const auth = require("../auth/auth");
const app = express();
const { ObjectId } = require("mongodb");

app.get("/api/education/cv/:cvId", async (req, res) => {
  try {
    const education = await educationModel.findOne({
      cv: ObjectId(req.params.cvId),
    });
    res.send(education);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/api/education/:id", async (req, res) => {
  try {
    const education = await educationModel.findOne({
      _id: ObjectId(req.params.id),
    });
    res.send(education);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/api/education/create", async (req, res) => {
  const education = new educationModel(req.body);
  try {
    await education.save();
    res.send(education);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/api/education/:cvId/create", async (req, res) => {
  const education = new educationModel({
    cv: ObjectId(req.params.cvId),
  });
  try {
    await education.save();
    res.send(education);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.patch("/api/education/:id", async (req, res) => {
  try {
    await educationModel.findOneAndUpdate(
      {
        _id: ObjectId(req.params.id),
      },
      req.body
    );
    const education = await educationModel.findOne({
      _id: ObjectId(req.params.id),
    });
    res.send(education);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete("/api/education/:id", async (req, res) => {
  try {
    const education = await educationModel.findOne({
      _id: ObjectId(req.params.id),
    });
    await education.remove();
    res.send({ message: "Deleted education" });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app;
