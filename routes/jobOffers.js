var express = require("express");
var router = express.Router();
const { JobOffers } = require("../model/jobOffers");
const jobOfferModel = new JobOffers();

/* POST create a job offer */
router.post("/create", function (req, res, next) {
  if (
    !req.body ||
    (!req.body.hasOwnProperty("title")) || (req.body.title.length === 0) ||
    (!req.body.hasOwnProperty("contactMail")) || (req.body.contactMail.length === 0) ||
    (!req.body.hasOwnProperty("description")) || (req.body.description.length === 0) ||
    (!req.body.hasOwnProperty("contractType"))||( req.body.contractType.length === 0) ||
    (!req.body.hasOwnProperty("idCompany"))||(req.body.idCompany <= 0)
  ) {
    return res.status(400).end();
  }
  const newJobOffer = jobOfferModel.createOne(
    req.body.title,
    req.body.contactMail,
    req.body.description,
    req.body.contractType,
    req.body.idCompany
  )
  if (!newJobOffer) return res.status(500).end(); 
    return res.json(newJobOffer);
});

module.exports = router;
