"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class UserRole extends Model {
      static associate(models) {
      }
    }
    UserRole.init(
      {
        id_usuario: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        id_rol: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          field: "created_at",
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          field: "updated_at",
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "UserRole",
        tableName: "Users_Roles",
      }
    );
    return UserRole;
  };
