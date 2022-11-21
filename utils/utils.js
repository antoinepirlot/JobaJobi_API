const jwtSecret = process.env.jwtSecret;
const jwt = require("jsonwebtoken");

const decodeToken = (token) => {
  return jwt.verify(token, jwtSecret);
}

module.exports = {decodeToken};