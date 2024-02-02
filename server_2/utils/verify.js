const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  // console.log(req.headers.authorization);
  const token = req.headers.authorization.split(" ")[1];
  // console.log(token);
  if (!token) {
    return res.json("Token not found");
  }

  console.log("Verify Token Invoked!!");
  const decoded = jwt.verify(token, "impossible");
  // console.log(decoded);
  req.user = decoded;

  next();
}
module.exports = verifyToken;
