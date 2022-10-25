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
        foreignKey: 'meetingId'
      });
      this.belongsTo(models.Users, {
        foreignKey: 'userId'
      });
    }
  }
  Comments.init({
    commentId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    meetingId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Meetings",
        key: "meetingId"
      },
      onDelete: "cascade",
    },
    userId: DataTypes.INTEGER,
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comments',
  });
  return Comments;
};