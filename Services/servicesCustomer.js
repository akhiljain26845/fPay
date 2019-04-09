const {
  user_Details,
  acc_Details,
} = require('../Models/fPayModels.js');

function getDetailsfromDB(acc_No) {
  return user_Details.findAll({
    raw: true,
    where: {
      acc_No: acc_No
    }
  });
}

function createAccountinDB(u_Name, u_acc_No, u_DOB, u_phoneNo) {
  return user_Details.create({
    name: u_Name,
    acc_No: u_acc_No,
    DOB: u_DOB,
    phoneNo: u_phoneNo
  });
}

function checkBalance(acc_no_sender) {
  return acc_Details.findAll({
      raw: true,
      attributes: ['balance'],
      where: {
        acc_No: acc_no_sender
      }
    })
    .then(function(senderPartyBalance) {
      if (typeof senderPartyBalance[0] == "undefined") {
        return `Account ${acc_no_sender} does not exists`;
      } else {
        return Number(senderPartyBalance[0]["balance"]);
      }
    })
}

function sendAmount(acc_no_sender, acc_no_receiver, amount, senderBalance) {
  var msg;
  senderBalance = senderBalance - amount;
  return acc_Details.update({
      balance: senderBalance,
    }, {
      where: {
        acc_No: acc_no_sender
      }
    })
    .then(function() {
      var updatedBalanceReceiver;
      msg = `Updated Sender Account ${acc_no_sender} balance: ${senderBalance}`;
      return acc_Details.findAll({
          raw: true,
          attributes: ['balance'],
          where: {
            acc_No: acc_no_receiver
          }
        })
        .then(function(receiverPartyBalance) {
          updatedBalanceReceiver = Number(receiverPartyBalance[0]["balance"]);
          updatedBalanceReceiver = updatedBalanceReceiver + Number(amount);
          acc_Details.update({
            balance: updatedBalanceReceiver,
          }, {
            where: {
              acc_No: acc_no_receiver
            }
          })
          msg = msg + `\nUpdated Receiver Account ${acc_no_receiver} balance: ${updatedBalanceReceiver}`;
          return msg;
        })
    })
}

function accountBalancefromDB(acc_No) {
  return acc_Details.findAll({
    raw: true,
    attributes: ['balance'],
    where: {
      acc_No: acc_No
    }
  });
}

function createAccountForTransaction(acc_No) {
  return acc_Details.create({
    acc_No: acc_No,
    balance: 1000
  });
}

function deleteAccountfromDB(acc_No) {
  return user_Details.destroy({
      where: {
        acc_No: acc_No
      }
    })
    .then(function() {
      acc_Details.destroy({
        where: {
          acc_No: acc_No
        }
      })
    })
}

module.exports = {
  getDetailsfromDB,
  createAccountinDB,
  sendAmount,
  accountBalancefromDB,
  createAccountForTransaction,
  deleteAccountfromDB,
  checkBalance
}