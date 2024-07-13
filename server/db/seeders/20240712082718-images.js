"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Images",
      [
        {
          link: "img/imgSneakers/NIKE JORDAN AIR JORDAN 1 LOW/1.png",
          sneakerId: 1,
        },
        {
          link: "img/imgSneakers/NIKE JORDAN AIR JORDAN 1 LOW/2.png",
          sneakerId: 1,
        },
        {
          link: "img/imgSneakers/NIKE JORDAN AIR JORDAN 1 LOW/3.png",
          sneakerId: 1,
        },
        {
          link: "img/imgSneakers/NIKE JORDAN AIR JORDAN 1 LOW/1.png",
          sneakerId: 2,
        },
        {
          link: "img/imgSneakers/NIKE JORDAN AIR JORDAN 1 LOW/2.png",
          sneakerId: 2,
        },
        {
          link: "img/imgSneakers/NIKE JORDAN AIR JORDAN 1 LOW/3.png",
          sneakerId: 2,
        },
        {
          link: "img/imgSneakers/NIKE JORDAN AIR JORDAN 1 LOW/1.png",
          sneakerId: 3,
        },
        {
          link: "img/imgSneakers/NIKE JORDAN AIR JORDAN 1 LOW/2.png",
          sneakerId: 3,
        },
        {
          link: "img/imgSneakers/NIKE JORDAN AIR JORDAN 1 LOW/3.png",
          sneakerId: 3,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Images", null, {});
  },
};
