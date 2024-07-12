'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Brands",
      [
        {
          name: "Nike",
        },
        {
          name: "Adidas",
        },
        {
          name: "Reebok",
        },
        {
          name: "Puma",
        },
        {
          name: "New Balance",
        },
        
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Brands", null, {});
  },
};
