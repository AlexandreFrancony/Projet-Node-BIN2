const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const connection = require("../lib/db");

class User extends Model {}

User.init(
  {
    lastname: {type: DataTypes.STRING, allowNull: false},
    firstname: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false, isEmail : true},
    password: {type: DataTypes.STRING, allowNull: false},
    createdAt: {type: DataTypes.DATE, allowNull: false},
    updatedAt: {type: DataTypes.DATE, allowNull: false},
    isAdmin: {type: DataTypes.BOOLEAN, defaultValue: false, allownull: false},
  },
  {
    sequelize: connection,
    modelName: "User",
  }
);

function encodePassword(user) {
  user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
}

User.addHook("beforeCreate", encodePassword);
User.addHook("beforeUpdate", encodePassword);

module.exports = User;