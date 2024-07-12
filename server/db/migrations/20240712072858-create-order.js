'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      totalPrice: {
        type: Sequelize.INTEGER
      },
      basketId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Baskets",
          key: "id",
        },

        onDelete: "CASCADE",
        onUpdate: "CASCADE",

      },
      statusId: {
        type: Sequelize.INTEGER,
        // allowNull:true, ЕСЛИ НЕ УСПЕЕМ
        references: {
          model: "Statuses",
          key: "id",
        },

        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};