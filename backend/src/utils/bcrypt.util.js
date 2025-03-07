const bcrypt = require("bcryptjs");

exports.hashPassword = (password) => {
  return bcrypt.hash(password, 10);
};

exports.comparePasswords = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};
