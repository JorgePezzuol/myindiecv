const express = require("express");
const languageModel = require("../models/LanguageModel");
const jwt = require("jsonwebtoken");
const auth = require("../auth/auth");
const app = express();
const { ObjectId } = require("mongodb");

app.get("/api/languages/cv/:cvId", async (req, res) => {
  try {
    const language = await languageModel.findOne({
      cv: ObjectId(req.params.cvId),
    });
    res.send(language);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/api/languages/:id", async (req, res) => {
  try {
    const language = await languageModel.findOne({
      _id: ObjectId(req.params.id),
    });
    res.send(language);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/api/languages/create", async (req, res) => {
  const language = new languageModel(req.body);
  try {
    await language.save();
    res.send(language);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/api/languages/:cvId/create", async (req, res) => {
  const language = new languageModel({
    cv: ObjectId(req.params.cvId),
  });
  try {
    await language.save();
    res.send(language);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.patch("/api/languages/:id", async (req, res) => {
  try {
    await languageModel.findOneAndUpdate(
      {
        _id: ObjectId(req.params.id),
      },
      req.body
    );
    const language = await languageModel.findOne({
      _id: ObjectId(req.params.id),
    });
    res.send(language);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete("/api/languages/:id", async (req, res) => {
  try {
    const language = await languageModel.findOne({
      _id: ObjectId(req.params.id),
    });
    await language.remove();
    res.send({ message: "Deleted language" });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app;
