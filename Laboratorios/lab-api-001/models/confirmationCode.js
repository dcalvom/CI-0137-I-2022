"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ConfirmationCode extends Model {
    static associate(models) {
    }
  }
  ConfirmationCode.init(
    {
      idUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        field: "id_usuario",
      },
      code: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: "updated_at",
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: "ConfirmationCode",
      tableName: "Confirmation_Codes"
    }
  );
  return ConfirmationCode;
};