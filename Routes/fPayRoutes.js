const {
  Router
} = require("express");
const bankRoute = Router();
const {
  getDetails,
  createAccount,
  sendAmountToOtherAccount,
  accountBalance,
  deleteAccount
} = require('../Controller/bankCustomer.js');

bankRoute.get("/accDetails/:id", getDetails);
bankRoute.post("/accCreation", createAccount);
bankRoute.post("/deposit", sendAmountToOtherAccount);
bankRoute.get("/accBalance/:id", accountBalance);
bankRoute.put("/deleteAccount/:id", deleteAccount);

module.exports = bankRoute;