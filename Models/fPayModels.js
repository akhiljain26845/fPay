const Sequelize = require('sequelize');

//Sequelize and db Connectivity
const db = new Sequelize('fpaybank', 'postgres', '8962688619' , {
	host : 'localhost',
	dialect : 'postgres'
});

db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


var user_Details = db.define('user_detail', {
	//attributes
	name : {
		type : Sequelize.STRING,
		allowNull : false, 
		// validate : {
		// 	is : ["^[a-zA-Z][a-zA-Z]+[a-zA-Z]$"]
		// }
	},
	acc_No : {
	  type : Sequelize.BIGINT(15),
	  allowNull : false,
	  validate : {
	  	isNumeric : true
	  },
	  unique : true
	},
	DOB : {
	  type : Sequelize.STRING,
	  allowNull : false,
	  validate : { 
	  	not : ["^[A-Za-z]+$"]
	  }
	},
	phoneNo : {
	  type : Sequelize.BIGINT(10),
	  validate : {
	  	isNumeric : true
	  }
	}
} , { 
	db,
  // freezeTableName : true 
});

var acc_Details = db.define('acc_detail', {
	//attributes
	acc_No : {
		type : Sequelize.BIGINT(15),
		allowNull : false,
		validate : { 
			isNumeric : true 
		},
		unique : true
	},
	balance : {
		type : Sequelize.BIGINT(25),
	}
} , {
	db,
  // freezeTableName: true
});

user_Details.sync();
acc_Details.sync();

module.exports = {
  acc_Details,
  user_Details
};
