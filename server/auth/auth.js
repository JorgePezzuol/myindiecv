const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();
module.exports.authenticateToken = (req, res, next) => {
  const token = req.cookies.token || "";
  try {
    if (!token) {
      //return res.sendStatus(401);
      res.redirect("https://myindiecv.herokuapp.com/login");
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      //if (err) return res.sendStatus(401);
      if (err) res.redirect("https://myindiecv.herokuapp.com/login");
      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(500);
  }
};
