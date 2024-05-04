const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");
const helper = require("../../src/helper");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: helper.getDbID,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "createdAt",
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "updatedAt",
    },
  },
  {
    tableName: "Users", // Optional: Specify the table name explicitly
    timestamps: true, // Optional: Set to true if you want Sequelize to manage createdAt and updatedAt fields
  }
);

module.exports = User;
