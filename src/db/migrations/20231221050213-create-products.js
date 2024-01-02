'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      productId: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(6)
      },
      productName: {
        allowNull: false,
        type: Sequelize.STRING(30)
      },
      productStock: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      productUnit: {
        allowNull: false,
        type: Sequelize.STRING(10)
      },
      productPrice: {
        allowNull: false,
        type: Sequelize.BIGINT
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
    await queryInterface.dropTable('products');
  }
};