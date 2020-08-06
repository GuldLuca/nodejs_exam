const Sequelize = require("sequelize");
const DB = require("./database");

//Defining table
const Profile = DB.define("profile", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  firstname: {
    type: Sequelize.STRING,
  },
  lastname: {
    type: Sequelize.STRING
  },
  phone: {
    type: Sequelize.INTEGER
  },
  location: {
    type: Sequelize.STRING
  }
});

module.exports = Profile;