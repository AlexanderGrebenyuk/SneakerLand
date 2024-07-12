"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Sizes",
      [
        {
          size: 36,
        },
        {
          size: 37,
        },
        {
          size: 38,
        },
        {
          size: 39,
        },
        {
          size: 40,
        },
        {
          size: 41,
        },
        {
          size: 42,
        },
        {
          size: 43,
        },
        {
          size: 44,
        },
        {
          size: 45,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Sizes", null, {});
  },
};
