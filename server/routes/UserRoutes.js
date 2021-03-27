const express = require("express");
const userModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../auth/auth");
const app = express();

app.get("/api/users", auth.authenticateToken, async (req, res) => {
  try {
    const users = await userModel.find({});
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/users/:email", async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.params.email });
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/api/users/login", async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    const cmp = await user.isValidPassword(req.body.password);

    if (user && cmp) {
      const token = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "7d",
      });
      res.cookie("token", token, {
        secure: process.env.NODE_ENV === "production" ? true : false,
        httpOnly: true,
        sameSite: true,
        maxAge: 24 * 60 * 60 * 14000,
        domain: "https://myindiecv.herokuapp.com/",
        overwrite: true,
      });
      res.status(200).send(user.toJSON());
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    res.sendStatus(401);
  }
});

app.get("/api/users/logout", async (req, res) => {
  res
    .cookie("token", "", {
      domain: "https://myindiecv.herokuapp.com/",
      maxAge: 0,
      overwrite: true,
    })
    .sendStatus(200);
});

app.post("/api/users/create", async (req, res) => {
  const user = new userModel(req.body);
  try {
    await user.save();
    const token = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      secure: process.env.NODE_ENV === "production" ? true : false,
      httpOnly: true,
      sameSite: true,
      maxAge: 24 * 60 * 60 * 14000,
      domain: "https://myindiecv.herokuapp.com/",
      overwrite: true,
    });
    res.status(200).send(user.toJSON());
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/api/test", async (req, res) => {
  res
    .cookie("token", "", {
      domain: "https://myindiecv.herokuapp.com/",
      maxAge: 0,
      overwrite: true,
    })
    .sendStatus(200);
});

module.exports = app;
