"use strict"
const { parse, serialize } = require("../utils/json");
const jsonDbPath = __dirname + "/../data/jobOffers.json";

class JobOffers {
    constructor(dbPath = jsonDbPath) {
      this.jsonDbPath = dbPath;
    }

    async createOne(title,contactMail,description,contractType,idCompany){
        let items = parse(this.jsonDbPath);
        const newOffer = {
            "idJobOffer":items.length+1,
            "title":title,
            "contactMail":contactMail,
            "description":description,
            "contractType":contractType,
            "idCompany":idCompany,
            "interestedUsersId":[]
        }
        items.push(newOffer);
        serialize(this.jsonDbPath, items);
        return items
    }


}

module.exports = { JobOffers };