
const Sequelize = require("sequelize");
const DB = require("./database");

//Defining message table
const Message = DB.define("message", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  from: Sequelize.STRING,
  message: Sequelize.STRING,
  time: {
      type: Sequelize.DATE,
      default: Sequelize.NOW
  }
});

module.exports = Message;