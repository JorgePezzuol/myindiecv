const express = require("express");
const linksModel = require("../models/LinksModel");
const jwt = require("jsonwebtoken");
const auth = require("../auth/auth");
const app = express();
const { ObjectId } = require("mongodb");

app.get("/api/links/cv/:cvId", async (req, res) => {
  try {
    const link = await linksModel.findOne({
      cv: ObjectId(req.params.cvId),
    });
    res.send(link);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/api/links/:id", async (req, res) => {
  try {
    const link = await linksModel.findOne({
      _id: ObjectId(req.params.id),
    });
    res.send(link);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/api/links/create", async (req, res) => {
  const link = new linksModel(req.body);
  try {
    await link.save();
    res.send(link);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/api/links/:cvId/create", async (req, res) => {
  const link = new linksModel({
    cv: ObjectId(req.params.cvId),
  });
  try {
    await link.save();
    res.send(link);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.patch("/api/links/:id", async (req, res) => {
  try {
    await linksModel.findOneAndUpdate(
      {
        _id: ObjectId(req.params.id),
      },
      req.body
    );
    const link = await linksModel.findOne({
      _id: ObjectId(req.params.id),
    });
    res.send(link);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete("/api/links/:id", async (req, res) => {
  try {
    const link = await linksModel.findOne({
      _id: ObjectId(req.params.id),
    });
    await link.remove();
    res.send({ message: "Deleted link" });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app;
