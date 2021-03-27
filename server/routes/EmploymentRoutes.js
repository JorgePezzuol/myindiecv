const express = require("express");
const employmentModel = require("../models/EmploymentModel");
const auth = require("../auth/auth");
const app = express();
const { ObjectId } = require("mongodb");

app.get("/api/employment/cv/:cvId", async (req, res) => {
  try {
    const employment = await employmentModel.findOne({
      cv: ObjectId(req.params.cvId),
    });
    res.send(employment);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/api/employment/:id", async (req, res) => {
  try {
    const employment = await employmentModel.findOne({
      _id: ObjectId(req.params.id),
    });
    res.send(employment);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/api/employment/create", async (req, res) => {
  const employment = new employmentModel(req.body);
  try {
    await employment.save();
    res.send(employment);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/api/employment/:cvId/create", async (req, res) => {
  const employment = new employmentModel({
    cv: ObjectId(req.params.cvId),
  });
  try {
    await employment.save();
    res.send(employment);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.patch("/api/employment/:id", async (req, res) => {
  try {
    await employmentModel.findOneAndUpdate(
      {
        _id: ObjectId(req.params.id),
      },
      req.body
    );
    const employment = await employmentModel.findOne({
      _id: ObjectId(req.params.id),
    });
    res.send(employment);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete("/api/employment/:id", async (req, res) => {
  try {
    const employment = await employmentModel.findOne({
      _id: ObjectId(req.params.id),
    });
    await employment.remove();
    res.send({ message: "Deleted employment" });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app;
