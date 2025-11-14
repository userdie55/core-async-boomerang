const inquirer = require('inquirer').default;
const db = require('../db/models');

class PlayerRegistration {
  async createPlayer() {
    const { name } = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Введите ваше имя:',
        validate: (value) => {
          if (!value || value.trim().length < 1) return 'Введите имя!';
          return true;
        },
      },
    ]);

    const player = await db.Player.create({
      name: name.trim(),
    });

    return player; 
  }
}

module.exports = PlayerRegistration;

