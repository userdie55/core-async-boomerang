'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('result', [
      { player_id: 1, score: 10, time: 120 },
      { player_id: 2, score: 20, time: 300 },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('result', null, {});
  }
};

