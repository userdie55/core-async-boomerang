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

  // Какая-то функция.
  function runInteractiveConsole() {
    keypress(process.stdin);
    process.stdin.on('keypress', (ch, key) => {
      if (key) {
        // Вызывает команду, соответствующую нажатой кнопке.
        if (key.name in keyboard) {
          keyboard[key.name]();
        }
        if (key.name === 'space') {
          keyboard.space();
        }
        // Прерывание программы.
        if (key.ctrl && key.name === 'c') {
          process.exit();
        }
      }
    });
    process.stdin.setRawMode(true);
    process.stdin.resume();
  }

  // Давай попробуем запустить этот скрипт!
  runInteractiveConsole();
}

module.exports = createKeyboard;
