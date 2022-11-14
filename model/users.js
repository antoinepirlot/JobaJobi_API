"use strict";
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
require("dotenv").config();
const { parse, serialize } = require("../utils/json");
//var escape = require("escape-html");
const jwtSecret = process.env.jwtSecret;
const LIFETIME_JWT = 24 * 60 * 60 * 1000; // 24h

const jsonDbPath = __dirname + "/../data/users.json";


class Users {
  constructor(dbPath = jsonDbPath) {
    this.jsonDbPath = dbPath;
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
      email: email,
      token: "",
    };

    const token = jwt.sign(
      { email: authenticatedUser.email }, 
      jwtSecret, 
      { expiresIn: LIFETIME_JWT } // lifetime of the JWT
    );

    authenticatedUser.token = token;
    return authenticatedUser;
  }
}

module.exports = { Users };
