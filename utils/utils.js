const jwtSecret = process.env.jwtSecret;
const jwt = require("jsonwebtoken");

function decodeToken(token) {
  return jwt.verify(token, jwtSecret);
}

module.exports = {decodeToken}