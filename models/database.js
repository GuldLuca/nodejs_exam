const Sequelize = require("sequelize");

//Database object
const sequelize = new Sequelize("chatroom", "root", "password", {
  dialect: "mysql",
  host: "localhost"
});

module.exports = sequelize;