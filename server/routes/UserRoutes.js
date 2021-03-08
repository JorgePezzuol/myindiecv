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
        expiresIn: "25s",
      });
      res.cookie("token", token, {
        secure: false,
        httpOnly: true,
      });
      res.send({ token: token });
    } else {
      res.send("User not found");
    }
  } catch (err) {
    res.status(500).send(err);
    console.error(err);
  }
});

module.exports = app;

/*

      try {
        const user = await UserModel.findOne({ email });

        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, { message: "Wrong Password" });
        }

        return done(null, user, { message: "Logged in Successfully" });
      } catch (error) {
        return done(error);
      }
      */
