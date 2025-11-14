'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Result extends Model {
    static associate(models) {
      Result.belongsTo(models.Player, { foreignKey: 'player_id' });
    }
  }

  Result.init(
    {
      player_id: DataTypes.BIGINT,
      score: DataTypes.BIGINT,
      time: DataTypes.BIGINT,
    },
    {
      sequelize,
      modelName: 'Result',
      tableName: 'result', // <───── ВАЖНО!!!
      timestamps: false,
    },
  );

  return Result;
};
