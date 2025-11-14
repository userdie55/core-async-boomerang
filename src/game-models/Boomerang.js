// Бумеранг является оружием.
// В дальнейшем можно добавить другое оружие.
// Тогда можно будет создать класс Weapon и воспользоваться наследованием!

class Boomerang {
  constructor() {
    this.skin = '🌀';
    this.position = null;
    this.state = 'idle'; // idle | flying | returning
    this.direction = 1
    this.isActive = false;
    this.hero = null;
  }

  attachHero(hero) {
    this.hero = hero;
  }

  fly() {
    if (this.state !== 'idle') return
    if (!this.hero) return;
    this.position = this.hero.position + 1;
    this.state = 'flying';
    this.direction = 1;
    this.isActive = true;
  }

  update() {
    if (!this.isActive) return;

    this.position += this.direction;

    if (this.state === 'flying' && this.position >= 19) {
      this.state = 'returning';
      this.direction = -1;
    }

    if (this.state === 'returning' && this.position <= this.hero.position) {
      this.reset();
    }
  }

  reset() {
    this.state = 'idle';
    this.isActive = false;
    this.position = null;
    this.direction = 1;
  }
}

module.exports = Boomerang;
