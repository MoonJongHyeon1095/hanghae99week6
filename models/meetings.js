'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Meetings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Comments, {
        as: 'Comments',
        foreignKey: 'meetingid',
      });
      this.hasMany(models.Participates, {
        as: 'Participates',
        foreignKey: 'meetingid',
      });
    }
  }
  Meetings.init({
    userId: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    likeCount: DataTypes.INTEGER,
    partucupateCount: DataTypes.INTEGER,
    nickname: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Meetings',
  });
  return Meetings;
};