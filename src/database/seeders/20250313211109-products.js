"use strict";
/** @type {import('sequelize-cli').Migration} */

const products = require("./data.json").products;
const specs = require("./data.json").specs;
const medias = require("./data.json").medias;
const categories = require("./data.json").categories;

module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */

        await queryInterface.bulkInsert("Products", products, {});
        await queryInterface.bulkInsert("Specs", specs, {});
        await queryInterface.bulkInsert("Multimedia", medias, {});
        await queryInterface.bulkInsert("Categories", categories, {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         *
         */

        await queryInterface.bulkDelete("Products", null, {});
        await queryInterface.bulkDelete("Specs", null, {});
        await queryInterface.bulkDelete("Categories", null, {});
        await queryInterface.bulkDelete("Multimedia", null, {});
    },
};
