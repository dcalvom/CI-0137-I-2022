"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserRecoveryCode extends Model {
    static associate(models) {}
  }
  UserRecoveryCode.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        field: "user_id",
      },
      code: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true,
        }
      },
      expirationDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "expiration_date",
      },
    },
    {
        sequelize,
        timestamps: false,
        tableName: "Users_Recovery_Codes",
        modelName: "UserRecoveryCode",
    }
  );
  return UserRecoveryCode;
};
