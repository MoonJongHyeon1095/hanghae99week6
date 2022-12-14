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
        foreignKey: 'meetingId',
      });
      this.hasMany(models.Participates, {
        as: 'Participates',
        foreignKey: 'meetingId',
      });
      this.hasMany(models.Likes, {
        as: 'Likes',
        foreignKey: 'meetingId'
      });
    }
  }
  
  Meetings.init({
    meetingId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId:{
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    title:{
      type:DataTypes.STRING,
      allowNull: false,
    },
    content:{
      type:DataTypes.STRING,
      allowNull: false,
    },
    likeCount:{
      type:DataTypes.INTEGER,
      allowNull: false,
      defaultValue:0
    },
    participateCount:{
      type:DataTypes.INTEGER,
      allowNull: false,
      defaultValue:0
    },
    nickname:{
      type:DataTypes.STRING,
      allowNull: false,
    },
    imageUrls:{
      type:DataTypes.STRING,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'Meetings',
  });
  return Meetings;
};