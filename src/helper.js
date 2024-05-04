const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");

const getDbID = () => {
  return uuidv4().substring(1, 34).replace(/-/g, "");
};

function generateJWTSecret(length = 64) {
  return crypto.randomBytes(length).toString("hex");
}

module.exports = { getDbID, generateJWTSecret };
