'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Meetings', {
      meetingId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      likeCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      participateCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      nickname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      imageUrls:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Meetings');
  }
};