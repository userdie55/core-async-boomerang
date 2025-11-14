
const inquirer = require('inquirer').default
const Player = require('./Player');

class PlayerRegistration {
  async createPlayer() {
    const { name } = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Введите ваше имя:',
        validate: (value) => this.validateName(value),
      },
    ]);

    return new Player(name.trim());
  }

  validateName(name) {
    if (!name || name.trim().length < 3) {
      return 'Имя должно быть длиной не менее 3 символов';
    }
    return true;
  }

  startSession(player, game) {
    game.player = player;
    game.startLoop();
  }
}

module.exports = PlayerRegistration;
