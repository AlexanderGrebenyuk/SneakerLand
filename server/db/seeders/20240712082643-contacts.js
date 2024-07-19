"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Contacts",
      [
        {
          address:
            'Санкт-Петербург, 192007, Лиговский проспект, 140, Бизнес-центр "Eco Standart",  SneakerLand',
          email: "sneaker_land@gmail.com",
          phone: "+7 (800) 555-35-55 ",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Contacts", null, {});
  },
};
