'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    static associate(models) {
      Player.hasMany(models.Result, { foreignKey: 'player_id' });
    }
  }

  Player.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Player',
      tableName: 'Players', // таблица из миграции
      timestamps: true,
    },
  );

  return Player;
};
