'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "OrderLines",
      [
        {
          count: 1,
          priceLine: 16490,
          orderId: 1, 
          sneakerId: 1
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("OrderLines", null, {});
  },
};
