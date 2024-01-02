'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      userId: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      username: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      productId: {
        allowNull: false,
        type: Sequelize.STRING(6)
      },
      productName: {
        allowNull: false,
        type: Sequelize.STRING(30)
      },
      price: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      amount: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      unit: {
        allowNull: false,
        type: Sequelize.STRING(10)
      },
      totalPrice: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING(10)
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
    await queryInterface.dropTable('transactions');
  }
};