var express = require("express");
var router = express.Router();
const { JobOffers } = require("../model/jobOffers");
const jobOfferModel = new JobOffers();
const { authorize } = require("../utils/authorize");
const { Users } = require("../model/users");
const userModel = new Users();

/* POST create a job offer */
router.post("/create", authorize, function (req, res, next) {
  if (req.user.type !== "Entreprise") return res.status(403).end();
  if (
    !req.body ||
    !req.body.hasOwnProperty("title") ||
    req.body.title.length === 0 ||
    !req.body.hasOwnProperty("contactMail") ||
    req.body.contactMail.length === 0 ||
    !req.body.hasOwnProperty("description") ||
    req.body.description.length === 0 ||
    !req.body.hasOwnProperty("contractType") ||
    req.body.contractType.length === 0 ||
    !req.body.hasOwnProperty("idCompany") ||
    req.body.idCompany <= 0
  ) {
    return res.status(400).end();
  }
  const newJobOffer = jobOfferModel.createOne(
    req.body.title,
    req.body.contactMail,
    req.body.description,
    req.body.contractType,
    req.body.idCompany
  );
  if (!newJobOffer) return res.status(500).end();
  return res.json(newJobOffer);
});

/* GET get a job offer based on its id */
router.get("/id/:id", authorize, function (req, res, next) {
  if (req.params.id === undefined) return res.status(403).end();
  const offer = jobOfferModel.getJobOfferById(req.params.id);
  if (offer === undefined) res.sendStatus(404).end();
  res.send(offer);
});

/* GET get all job offers for a specific company */
router.get("/company/getAllMyJobOffers/", authorize, function (req, res, next) {
  if (req.user.type !== "Entreprise") return res.status(403).end();
  const myOffers = jobOfferModel.getAllMyJobOffers(req.user.id);
  res.send(myOffers);
});

/* GET get all job offers */
router.get("/getAll/", authorize, function (req, res, next) {
  const offers = jobOfferModel.getAllJobOffers();
  res.send(offers);
});

/* GET get all interested users to a job offer based on the id of the job offer */
router.get("/getAllInterested/:id", authorize, function (req, res, next) { 
  const idsInterested = jobOfferModel.getAllInterestedFromAJobOffer(req.params.id);
  let allInterested = [];
  let indice = 0;
  for(let i=0; i<idsInterested.length; i++){
    let userFound = userModel.getOneById(idsInterested[i].idUser);
    if(userFound !== undefined){
      allInterested[indice] = userFound;
      delete allInterested[indice].password; // delete the password for security
      indice ++;
    }
  }
  res.send(JSON.stringify(allInterested));
});

/* POST create an interest for a job offer */
router.post("/createIntrested/", authorize, function (req, res, next) {
  if (
    !req.body ||
    !req.body.hasOwnProperty("idOffer") ||
    req.body.idOffer.length <= 0 ||
    !req.body.hasOwnProperty("idUser") ||
    req.body.idUser.length <= 0
  ) {
    return res.status(400).end();
  }
  const newIntrested = jobOfferModel.createIntrested(
    req.body.idOffer,
    req.body.idUser
  );
  if (!newIntrested) return res.status(500).end();
  return res.json(newIntrested);
});

module.exports = router;
