const express = require("express");
const skillModel = require("../models/SkillModel");
const jwt = require("jsonwebtoken");
const auth = require("../auth/auth");
const app = express();
const { ObjectId } = require("mongodb");

app.get("/api/skills/cv/:cvId", async (req, res) => {
  try {
    const skill = await skillModel.findOne({
      cv: ObjectId(req.params.cvId),
    });
    res.send(skill);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/api/skills/:id", async (req, res) => {
  try {
    const skill = await skillModel.findOne({
      _id: ObjectId(req.params.id),
    });
    res.send(skill);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/api/skills/create", async (req, res) => {
  const skill = new skillModel(req.body);
  try {
    await skill.save();
    res.send(skill);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/api/skills/:cvId/create", async (req, res) => {
  const skill = new skillModel({
    cv: ObjectId(req.params.cvId),
    name: req.body.name,
    level: req.body.level,
  });

  try {
    await skill.save();
    res.send(skill);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.patch("/api/skills/:id", async (req, res) => {
  try {
    await skillModel.findOneAndUpdate(
      {
        _id: ObjectId(req.params.id),
      },
      req.body
    );
    const skill = await skillModel.findOne({
      _id: ObjectId(req.params.id),
    });
    res.send(skill);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete("/api/skills/:id", async (req, res) => {
  try {
    const skill = await skillModel.findOne({
      _id: ObjectId(req.params.id),
    });
    await skill.remove();
    res.send({ message: "Deleted skill" });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app;
