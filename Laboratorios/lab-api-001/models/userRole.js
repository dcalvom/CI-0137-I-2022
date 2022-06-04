"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class UserRole extends Model {
      static associate(models) {
      }
    }
    UserRole.init(
      {
        idUsuario: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          field: "id_usuario",
        },
        idRol: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          field: "id_rol",
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
        modelName: "UserRole",
        tableName: "Users_Roles",
      }
    );
    return UserRole;
  };
