'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        unique: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      roleId: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      firstname: {
        allowNull: false,
        type: Sequelize.STRING(30)
      },
      lastname: {
        allowNull: false,
        type: Sequelize.STRING(30)
      },
      fullname: {
        allowNull: false,
        type: Sequelize.STRING(30)
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING(30)
      },
      password: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      active: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      refreshToken: {
        allowNull: true,
        type: Sequelize.TEXT
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
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};