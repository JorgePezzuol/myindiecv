const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();
module.exports.authenticateToken = (req, res, next) => {
  const token = req.cookies.token || "";
  try {
    if (!token) {
      return res.sendStatus(401);
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(401);
      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(500);
  }
};
