var express = require('express');
var router = express.Router();
const { authorize } = require('../utils/authorize');
const { Users } = require("../model/users");
const userModel = new Users();

/* GET user of the session. */
router.get('/getUserSession/', authorize,function(req, res, next) {
  console.log(req.user);
  const result =  userModel.getUserFromSession(req.user);
  res.send(result);
});

/**
 * Get all favorites jobs offers of user identified by its id
 *
 */
router.get("/favorites/:userId", function(req, res) {
  // TODO: add authorize
  const userId = req.params["userId"];
  console.log(`/favorites/${userId}`);
  if (!userId || userId < 1) {
    return res.status(400).end();
  }

  return res.status(200).end();
});

module.exports = router;
