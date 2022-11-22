"use strict";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { parse, serialize} = require("../utils/json");
const {JobOffers} = require("./jobOffers");
const jobOffersModel = new JobOffers();

const jwtSecret = process.env.jwtSecret;
const LIFETIME_JWT = 24 * 60 * 60 * 1000; // 24h

const jsonDbPath = __dirname + "/../data/users.json";

class Users {
  constructor(dbPath = jsonDbPath) {
    this.jsonDbPath = dbPath;
  }

  getUserFromSession(user) {
    let userToReturn;
    //particular
    if (user.type === "Particulier") {
      userToReturn = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        birthday: user.birthday,
        phone: user.phone,
        email: user.email,
        type: user.type,
      };
    }
    //company
    else {
      userToReturn = {
        id: user.id,
        phone: user.phone,
        email: user.email,
        type: user.type,
        companyName: user.companyName,
        companyTown: user.companyTown,
        companyDescription: user.companyDescription,
      };
    }
    return userToReturn;
  }

  /**
   * Returns the user identified by email
   * @param {string} email - email of the item to find
   * @returns {object} the user found or undefined if the email does not lead to an user
   */
  getOneByEmail(email) {
    const items = parse(this.jsonDbPath);
    const foundIndex = items.findIndex((user) => user.email == email);
    if (foundIndex < 0) return;

    return items[foundIndex];
  }

  /**
   * Returns the user identified by its id
   * @param {string} id - id of the item to find
   * @returns {object} the user found or undefined if the email does not lead to an user
   */
  getOneById(id) {
    const items = parse(this.jsonDbPath);
    const foundIndex = items.findIndex((user) => user.id == parseInt(id));
    if (foundIndex < 0) return;
    return items[foundIndex];
  }

  /**
   * Authenticate a user and generate a token if the user credentials are OK
   * @param {*} email
   * @param {*} password
   * @returns {Promise} Promise of the authenticated user or undefined if the user could not be authenticated
   */

  async login(email, password) {
    const userFound = this.getOneByEmail(email);
    if (!userFound) return;
    // checked hash of passwords
    const match = await bcrypt.compare(password, userFound.password);
    if (!match) return;

    const authenticatedUser = {
      token: "",
    };

    authenticatedUser.token = this.getToken(userFound);
    return authenticatedUser;
  }

  async signup(newUser) {
    if(this.getOneByEmail(newUser.email)) {
      return;
    }
    const salt = bcrypt.genSaltSync(10);
    newUser.password = bcrypt.hashSync(newUser.password, salt);
    if (newUser.type == "Particulier") {
      newUser.companyName = null;
      newUser.companyTown = null;
      newUser.companyDescription = null;
    } else {
      newUser.firstName = null;
      newUser.lastName = null;
    }
    newUser.favorites = [];

    const items = parse(this.jsonDbPath);
    let nextId;
    if(items.length===0) nextId=1;
    else nextId = items[items.length - 1].id + 1;
    newUser.id = nextId;
    items.push(newUser);
    serialize(jsonDbPath, items);
    return this.getToken(newUser)
  }

  getAllFavorites(userId) {
    const users = parse(this.jsonDbPath);
    const favoritesIds = users.find(u => u.id === userId).favorites;
    const jobOffers = jobOffersModel.getAllJobOffers();
    const usersFavoritesOffers = [];
    favoritesIds.forEach(favoriteId => {
      usersFavoritesOffers.push(jobOffers.find(o => o.idJobOffer === favoriteId));
    });
    return usersFavoritesOffers;
  }

  getToken(authenticatedUser) {
    return jwt.sign(
        { id: authenticatedUser.id },
        jwtSecret,
        { expiresIn: LIFETIME_JWT } // lifetime of the JWT
    );
  }
}

module.exports = { Users };
