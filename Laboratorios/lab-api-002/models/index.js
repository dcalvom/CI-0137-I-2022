const Sequelize = require("sequelize");
const UserModel = require("./user");
const db = {};

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    dialect: "mysql",
  }
);

const userModel = UserModel(sequelize, Sequelize.DataTypes);
db[userModel.name] = userModel;
db[userModel.name].associate(db);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
