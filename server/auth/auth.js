const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();
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
