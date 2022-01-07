const Sequelize = require("sequelize");

const connection = new Sequelize(
  "mysql://root@localhost:3306/backend", {
    dialect: 'mysql',
    logging: false,
  }
);

connection.authenticate().then(() => console.log("Database connected"));

module.exports = connection;