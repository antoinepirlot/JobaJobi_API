var express = require("express");
var router = express.Router();
const {Users} = require("../model/users");
const userModel = new Users();

/* login a user : POST /auths/login */
router.post("/login", async function (req, res, next) {
  // if the body parameters are not valid => Send an error code 400
  if (
      !req.body ||
      (!req.body.hasOwnProperty("email") || req.body.email.length === 0) ||
      (!req.body.hasOwnProperty("password") || req.body.password.length === 0)
  ) {
    return res.status(400).end();
  }

  const authenticatedUser = await userModel.login(
      req.body.email,
      req.body.password
  );
  // Error code 401 if the user could not be authenticated
  if (!authenticatedUser) {
    return res.status(401).end();
  }

  return res.json(authenticatedUser);
});

/**
 * Sign up a new user
 */
router.post("/signup", async function (req, res) {
  console.log("POST: /auths/signup");
  const user = req.body;
  if (user === null
      || (!user.hasOwnProperty("type") && user.type == "")
      || (user.type != "Particulier" && user.type != "Entreprise")
      || user.type == "Particulier" && (
          (!user.hasOwnProperty("lastName") && user.lastName == "")
          || (!user.hasOwnProperty("firstName") && user.firstName == "")
          || (!user.hasOwnProperty("birthday") && user.birthday == "")
      )
      || user.type == "Entreprise" && (
          (!user.hasOwnProperty("companyName") && user.companyName == "")
          || (!user.hasOwnProperty("companyTown") && user.companyTown == "")
          || (!user.hasOwnProperty("companyDescription")
              && user.companyDescription == "")
      )
      || (!user.hasOwnProperty("phone") && user.phone == "")
      || (!user.hasOwnProperty("email") && user.email == "")
      || (!user.hasOwnProperty("password") && user.password == "")

  ) {
    return res.status(400).end();
  }
  const signedUpUser = await userModel.signup(req.body);
  if (!signedUpUser) {
    return res.status(401).end();
  }
  return res.json(signedUpUser);
});

module.exports = router;