const os = require('os');
const Sequelize = require("sequelize");

let sequelize = undefined;

if (os.hostname() === "web4") {
  sequelize = require("./database.web4.js");
} else {
  sequelize = new Sequelize("chatroom", "root", "password", {
    dialect: "mysql",
    host: "localhost"
  });
}

module.exports = sequelize;