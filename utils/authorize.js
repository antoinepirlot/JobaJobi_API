const { decodeToken } = require('../utils/utils');
const { Users } = require("../model/users");
const userModel = new Users();

const authorize = (req, res, next) => {
  let token = req.get("authorization");
  if (!token) return res.status(401).end();
  try {
    const decoded = decodeToken(token);
    const userFound = userModel.getOneById(decoded.id);
    if (!userFound) return res.status(403).end();
    req.user = userFound;
    next(); 
  } catch (err) {
    console.error("authorize: ", err);
    return res.status(403).end();
  }
};


module.exports = { authorize }; 
