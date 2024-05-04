const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");
const helper = require("../helper");

const Message = sequelize.define(
  "Message",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: helper.getDbID,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
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
    tableName: "messages",
    timestamps: true,
  }
);

module.exports = Message;
