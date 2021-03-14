const express = require("express");
const mongoose = require("mongoose");
const professionalSummaryModel = require("../models/ProfessionalSummaryModel");
const jwt = require("jsonwebtoken");
const auth = require("../auth/auth");
const app = express();
const { ObjectId } = require("mongodb");

app.get("/professionalsummary/cv/:cvId", async (req, res) => {
  try {
    const professionalSummary = await professionalSummaryModel.findOne({
      cv: ObjectId(req.params.cvId),
    });
    res.send(professionalSummary);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/professionalsummary/:id", async (req, res) => {
  try {
    // CHECK THIS !!!@@
    const professionalSummary = await professionalSummaryModel.findOne({
      _id: ObjectId(req.params.id),
    });
    res.send(professionalSummary);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/professionalsummary", async (req, res) => {
  const professionalSummary = new professionalSummaryModel(req.body);
  try {
    await professionalSummary.save();
    res.send(professionalSummary);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.patch("/professionalsummary/:id", async (req, res) => {
  try {
    await professionalSummaryModel.findOneAndUpdate(
      {
        _id: ObjectId(req.params.id),
      },
      req.body
    );
    const professionalSummary = await professionalSummaryModel.findOne({
      _id: ObjectId(req.params.id),
    });
    res.send(professionalSummary);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete("/professionalsummary/:id", async (req, res) => {
  try {
    const professionalSummary = await professionalSummaryModel.findOne({
      _id: ObjectId(req.params.id),
    });
    await professionalSummary.remove();
    res.send({ message: "Deleted professional summary" });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app;
