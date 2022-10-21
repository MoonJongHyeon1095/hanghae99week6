'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
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
  Comments.init({
    meetingId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comments',
  });
  return Comments;
};