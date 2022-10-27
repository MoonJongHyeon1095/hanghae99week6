'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      this.belongsTo(models.Meetings, {
        foreignKey: 'meetingId',
        // targetKey: 'meetingId',
      });
      this.belongsTo(models.Users, {
        foreignKey: 'userId',
        // targetKey: 'userId',
      });
    }
  }
  Images.init({
    imageId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    meetingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Meetings',
        key: 'meetingId',
      },
      onDelete: 'cascade',
    },
    userId:{ 
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imageUrl:{
        type: DataTypes.STRING,
        allowNull: false,
        unique : true,
    },
    MeetingMeetingId:{
      type: DataTypes.STRING,
      allowNull: true,
      },
  }, {
    sequelize,
    modelName: 'Images',
  });
  return Images;
};