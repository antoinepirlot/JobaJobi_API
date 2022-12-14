"use strict";
const { parse, serialize } = require("../utils/json");
const jsonDbPath = __dirname + "/../data/jobOffers.json";
const userJsonDbPath = __dirname + "/../data/users.json";

class JobOffers {
  constructor(dbPath = jsonDbPath, userDbPath = userJsonDbPath) {
    this.jsonDbPath = dbPath;
    this.userDbPath = userDbPath;
  }

  /**
   * Create a job offer
   * @param {*} title - title of the job offer
   * @param {*} contactMail - email of the person of contact
   * @param {*} description - description of the job offer
   * @param {*} contractType - type of contract in the job offer
   * @param {*} idCompany - id of the company
   * @returns
   */
  createOne(title, contactMail, description, contractType, idCompany) {
    let items = parse(this.jsonDbPath);
    const date = new Date();
    const currentDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    const newOffer = {
      idJobOffer: items.length + 1,
      publicationDate: currentDate,
      title: title,
      contactMail: contactMail,
      description: description,
      contractType: contractType,
      idCompany: idCompany,
      interestedUsersId: [],
    };
    items.push(newOffer);
    serialize(this.jsonDbPath, items);
    return items;
  }

  createIntrested(idOffer, idUser) {
    let items = parse(this.jsonDbPath);
    if (
      items
        .filter((item) => item.idJobOffer === idOffer)[0]
        .interestedUsersId.some((value) => value.idUser === idUser)
    ) {
      return items;
    }
    const result = items
      .filter((item) => item.idJobOffer === idOffer)[0]
      .interestedUsersId.push({ idUser: idUser });

    serialize(this.jsonDbPath, items);
    const users = parse(this.userDbPath);
    users.find(u => u.id === idUser).favorites.push(idOffer);
    serialize(this.userDbPath, users);
    return this.getJobOfferById(idOffer);
  }

  getJobOfferById(idJobOffer) {
    let items = parse(this.jsonDbPath);
    const result = items.filter(
      (item) => item.idJobOffer === parseInt(idJobOffer)
    );
    return result[0];
  }

  getAllMyJobOffers(idCompany) {
    let items = parse(this.jsonDbPath);

    const result = items.filter((item) => item.idCompany === idCompany);

    return result;
  }

  getAllJobOffers() {
    let items = parse(this.jsonDbPath);
    const result = items;
    return result;
  }

  getAllInterestedFromAJobOffer(idJobOffer){
    let items = parse(this.jsonDbPath);
    const result = items.filter((item) => item.idJobOffer === parseInt(idJobOffer))[0];
    return result.interestedUsersId;
  }
}

module.exports = { JobOffers };
