'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Meetings, {
        as: 'Meetings',
        foreignKey: 'userId',
      });
      this.hasMany(models.Comments, {
        as: 'Comments',
        foreignKey: 'userId',
      });
      this.hasMany(models.Likes, {
        as: 'Likes',
        foreignKey: 'userId',
      });
      this.hasMany(models.Participates, {
        as: 'Participates',
        foreignKey: 'userId',
      });
    }
  }
  Users.init(
    {
      userId: {
        allowNull: false, // NOT NULL, Null을 허용하지 않음
        autoIncrement: true, // AUTO_INCREMENT
        primaryKey: true, // PRIMARY KEY, 기본키
        unique: true, // UNIQUE, 유일한 값만 존재할 수 있음
        type: DataTypes.INTEGER,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Users',
      timestamps: false,
    }
  );
  return Users;
};