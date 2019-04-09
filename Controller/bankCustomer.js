const {
  getDetailsfromDB,
  createAccountinDB,
  sendAmount,
  accountBalancefromDB,
  createAccountForTransaction,
  deleteAccountfromDB,
  checkBalance
} = require('../Services/servicesCustomer.js');

function getDetails(req, res) {
  var id = req.params.id;
  if (id.length != 11) {
    res.json({
      message: "Invalid Id"
    });
  } else {
    getDetailsfromDB(id)
      .then(function(Detail) {
        if (Detail.length == 0) {
          res.status(404).json({
            "Error message": "Cannot get details of user"
          });
        } else {
          res.send(Detail);
        }
      })
  }
}

function createAccount(req, res) {
  const body = req.body;
  var Name = body.name;
  var acc_No = getRandomInt();
  createAccountinDB(body.name, acc_No, body.DOB, body.phoneNo)
    .then(function() {
      createAccountForTransaction(acc_No);
    })
    .then(function() {
      res.json({
        message: "Account created successfully",
        Accountno: `${acc_No}`,
        UserName: `${Name}`
      });
    })
    .catch(function() {
      res.json({
        "Error message": " Account is not created."
      });
    })
}

function sendAmountToOtherAccount(req, res) {
  const body1 = req.body;
  checkBalance(body1.SENDERACC)
    .then(function(senderBalance) {
      return senderBalance;
    })
    .then(function(senderBalance) {
      if (Number(senderBalance) <= 0 || (Number(senderBalance) - (body1.amount)) <= 0) {
        res.json({
          message: "Transaction Failed : Insufficient Balance"
        });
      } else {
        sendAmount(body1.SENDERACC, body1.RECEIVERACC, body1.amount, senderBalance)
          .then(function(msg) {
            res.json({
              msg
            });
          })
          .catch(function() {
            res.status(404).json({
              "Error Message": "One or both of account not exists"
            });
          })
      }
    })
}

function accountBalance(req, res) {
  var id = req.params.id;
  if (id.length != 11) {
    res.json({
      message: "Invalid Id"
    });
  } else {
    accountBalancefromDB(id)
      .then(function(acc_Detail) {
        var detail = acc_Detail[0]["balance"];
        res.json({
          id: `${id}`,
          balance: `${detail}`
        });
      })
      .catch(function() {
        res.status(404).json({
          "error message": "Cannot get balance"
        });
      })
  }
}

function deleteAccount(req, res) {
  var id = req.params.id;
  deleteAccountfromDB(id)
    .then(function() {
      res.json({
        message: "Account successfully Deleted"
      });
    })
}

function getRandomInt() {
  return Math.floor(Math.random() * (100000000000 - 1)) + 1;
}

module.exports = {
  getDetails,
  createAccount,
  sendAmountToOtherAccount,
  accountBalance,
  deleteAccount
};
