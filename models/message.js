
const Sequelize = require("sequelize");
const DB = require("./database");

//Creating new table in DB
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