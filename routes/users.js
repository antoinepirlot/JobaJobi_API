var express = require('express');
var router = express.Router();
const { authorize } = require('../utils/authorize');
const { Users } = require("../model/users");
const userModel = new Users();

/* GET user of the session. */
router.get('/getUserSession/', authorize,function(req, res, next) {
  const result =  userModel.getUserFromSession(req.user);
  res.send(result);
});

module.exports = router;
