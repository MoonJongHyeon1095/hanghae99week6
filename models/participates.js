'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Participates extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Meetings, {
        foreignKey: 'meetingId',
        targetKey: 'meetingId',
      });
      this.belongsTo(models.Users, {
        foreignKey: 'userId',
        targetKey: 'userId',
      });
    }
  }
  Participates.init({
    participateId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    meetingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId:{ 
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Participates',
  });
  return Participates;
};