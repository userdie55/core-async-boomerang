'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('result', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      player_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'Players',
          key: 'id',
        },
      },
      score: {
        type: Sequelize.BIGINT,
      },
      time: {
        type: Sequelize.BIGINT,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('result');
  },
};
