"use strict";
/** @type {import('sequelize-cli').Migration} */

const users = require("./data.json").users;
const roles = require("./data.json").roles;

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

        await queryInterface.bulkInsert("Users", users, {});
        await queryInterface.bulkInsert("Roles", roles, {});
        await queryInterface.bulkInsert("Recoveries", [], {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */

        await queryInterface.bulkDelete("Users", null, {});
        await queryInterface.bulkDelete("Roles", null, {});
        await queryInterface.bulkDelete("Recoveries", null, {});
    },
};
