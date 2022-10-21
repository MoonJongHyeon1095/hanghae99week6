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
    meetingId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    nickname: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Participates',
  });
  return Participates;
};