// Умеешь работать с keypress? Попробуй разобраться в этом файле.
// Вместо keypress можно использовать и стандартный readline.
// Главное не используй всё вместе!

const keypress = require('keypress');

// Управление.
// Настроим соответствия нажатий на клавиши и действий в игре.

function createKeyboard(game) {
  const keyboard = {
    a: () => game.hero.moveLeft(),
    d: () => game.hero.moveRight(),
    w: () => game.hero.moveUp(),
    s: () => game.hero.moveDown(),
    left: () => game.hero.moveLeft(),
    right: () => game.hero.moveRight(),
    up: () => game.hero.moveUp(),
    down: () => game.hero.moveDown(),
    space: () => game.hero.attack(),
    q: () => process.exit(),
  };

  function runInteractiveConsole() {
    keypress(process.stdin);
    process.stdin.on('keypress', (ch, key) => {
      if (key) {
        if (key.name in keyboard) {
          keyboard[key.name]();
        }
        if (key.name === 'space') {
          keyboard.space();
        }
        if (key.ctrl && key.name === 'c') {
          process.exit();
        }
      }
    });
    process.stdin.setRawMode(true);
    process.stdin.resume();
  }

  runInteractiveConsole();
}

module.exports = createKeyboard;
