const Sequelize = require("sequelize");

const sequelize = new Sequelize("chatroom", "root", "password", {
  dialect: "mysql",
  host: "localhost"
});

module.exports = sequelize;