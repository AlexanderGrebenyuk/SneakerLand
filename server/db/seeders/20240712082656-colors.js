"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Colors",
      [
        {
          name: "белый",
        },
        {
          name: "серый",
        },
        {
          name: "бежевый",
        },
        {
          name: "красный",
        },
        {
          name: "розовый",
        },
        {
          name: "голубой",
        },
        {
          name: "синий",
        },
        {
          name: "коричневый",
        },
        {
          name: "мультиколор",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Colors", null, {});
  },
};
