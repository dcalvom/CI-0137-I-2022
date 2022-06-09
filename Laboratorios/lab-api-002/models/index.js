const Sequelize = require("sequelize");
const UserModel = require("./user");
const RoleModel = require("./role");
const UserRoleModel = require("./userRole");
const UserRecoveryCodeModel = require("./userRecoveryCode");
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

const roleModel = RoleModel(sequelize, Sequelize.DataTypes);
db[roleModel.name] = roleModel;

const userRoleModel = UserRoleModel(sequelize, Sequelize.DataTypes);
db[userRoleModel.name] = userRoleModel;

const userRecoveryCodeModel = UserRecoveryCodeModel(sequelize, Sequelize.DataTypes);
db[userRecoveryCodeModel.name] = userRecoveryCodeModel;

db[userModel.name].associate(db);
db[roleModel.name].associate(db);
db[userRoleModel.name].associate(db);
db[userRecoveryCodeModel.name].associate(db);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
