'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      userId: {
        allowNull: false, // NOT NULL, Null을 허용하지 않음
        autoIncrement: true, // AUTO_INCREMENT
        primaryKey: true, // PRIMARY KEY, 기본키
        type: Sequelize.DataTypes.INTEGER,
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      nickname: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      refreshToken:{
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      snsId: {
        type: Sequelize.DataTypes.STRING,
        allowNull:true,
      },
      provider: {
        type: Sequelize.DataTypes.STRING,
        allowNull:true,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  },
};
