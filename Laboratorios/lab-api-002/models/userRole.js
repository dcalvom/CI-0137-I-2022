"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    static associate(models) {}
  }
  UserRole.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        field: "user_id",
      },
      roleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        field: "role_id",
      },
    },
    {
        sequelize,
        timestamps: false,
        tableName: "Users_Roles",
        modelName: "UserRole",
    }
  );
  return UserRole;
};
