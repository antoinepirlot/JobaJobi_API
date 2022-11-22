var express = require('express');
var router = express.Router();
const { authorize } = require('../utils/authorize');
const { Users } = require("../model/users");
const jwt = require("jsonwebtoken");
const {decodeToken} = require("../utils/utils");
const userModel = new Users();

/* GET user of the session. */
router.get('/getUserSession/', authorize,function(req, res, next) {
  const result =  userModel.getUserFromSession(req.user);
  res.send(result);
});

/**
 * Get all favorites jobs offers of user identified by its id
 *
 */
router.get("/favorites", authorize, function(req, res) {
  console.log(`/favorites`);
  const token = req.headers.authorization;
  const userId = decodeToken(token).id;
  const favorites = userModel.getAllFavorites(userId);
  return res.json(favorites);
});

/**
 * GET user by id
 */
 router.get("/id/:id", authorize, function (req, res, next) { //TODO : add authorize
  const user = userModel.getOneById(req.params.id);
  if(user !== undefined){
    delete user.password
    return res.send(JSON.stringify(user));
  }
  return res.status(404).end();
  
});

module.exports = router;
