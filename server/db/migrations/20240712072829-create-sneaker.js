"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Sneakers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      model: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      sexId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Sexes",
          key: "id",
        },

        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      sizeId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Sizes",
          key: "id",
        },

        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      colorId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Colors",
          key: "id",
        },

        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      brandId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Brands",
          key: "id",
        },

        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Sneakers");
  },
};
