// const jwt = require("jsonwebtoken");

// module.exports.authenticateToken = (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
//   if (token == null) return res.sendStatus(401);

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     console.log(err);
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// };

const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();
module.exports.authenticateToken = (req, res, next) => {
  const token = req.cookies.token || "";
  try {
    if (!token) {
      return res.status(401).json("You need to Login");
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      console.log(err);
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(500).json(err.toString());
  }
};
