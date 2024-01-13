const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "prajith", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
