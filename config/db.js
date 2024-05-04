const { Sequelize } = require("sequelize");

const dbName = "npcidb";
const dbUsername = "postgres";
const dbPassword = "Wasim@24075";
const dbHost = "localhost";
const dbPort = "5432";

const sequelize = new Sequelize(
  `postgres://${dbUsername}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`
);

module.exports = sequelize;
