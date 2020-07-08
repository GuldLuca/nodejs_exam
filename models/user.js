const Sequelize = require("sequelize");
const DB = require("./database");

//Creating new table in database reference "sequelize" - user table with following attributes
const User = DB.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  username: Sequelize.STRING,
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = User;