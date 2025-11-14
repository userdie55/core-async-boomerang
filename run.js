// Основной файл.
// Запускает игру.
const Game = require('./src/Game');
const PlayerRegistration = require('./src/PlayerRegistration');
const db = require('./db/models');

async function main() {
  await db.sequelize.authenticate();
  console.log('DB connected');

  const reg = new PlayerRegistration();
  const player = await reg.createPlayer();

  const game = new Game({
    trackLength: 40,
    db,
  });

  game.player = player;
  game.play();
}

main();
