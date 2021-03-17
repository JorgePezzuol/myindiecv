const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

// CREATE ANOTHER METHOD TO VERIFY IF req.cookies.token (get user)... see if is the same user id in the request
module.exports.authenticateToken = (req, res, next) => {
  let resp = true;
  try {
    jwt.verify(
      req.cookies.token,
      process.env.ACCESS_TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
          resp = false;
        }
      }
    );
    resp ? res.sendStatus(200) : res.sendStatus(401);
  } catch (err) {
    res.sendStatus(500);
  }
};
