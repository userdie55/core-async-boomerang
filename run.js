// Основной файл.
// Запускает игру.
const Game = require('./src/Game');
const PlayerService = require('./src/PlayerRegistration');

async function main() {
  const game = new Game({
    trackLength: 40,
  });

  const playerService = new PlayerService();

  const player = await playerService.createPlayer();

  playerService.startSession(player, game);
}

main();
