const express = require("express");
const userModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../auth/auth");
const app = express();

app.get("/users", auth.authenticateToken, async (req, res) => {
  try {
    const users = await userModel.find({});
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/user", async (req, res) => {
  const hashedPass = await bcrypt.hash(req.body.password, 10);
  const user = new userModel({
    email: req.body.email,
    password: hashedPass,
  });
  try {
    await user.save();
    res.send(user);
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

app.post("/login", async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    const cmp = await bcrypt.compare(req.body.password, user.password);

    if (user && cmp) {
      const token = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "20s",
      });
      res.cookie("token", token, {
        secure: process.env.NODE_ENV === "production" ? false : false,
        httpOnly: false,
      });
      res.send({ user: user.toJSON() });
    } else {
      res.status(404).send(err);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/authenticateToken", async (req, res) => {
  let resp = true;
  console.log(req.cookies.token);
  jwt.verify(
    req.cookies.token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      if (err) {
        console.log(err);
        resp = false;
      }
    }
  );

  console.log(resp);
  if (resp) {
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
  //auth.authenticateToken(req, res);
  //res.send({ resp: false });
});

module.exports = app;
