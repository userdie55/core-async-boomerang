// Бумеранг является оружием.
// В дальнейшем можно добавить другое оружие.
// Тогда можно будет создать класс Weapon и воспользоваться наследованием!

class Boomerang {
  constructor() {
    this.skin = '🌀';
    this.position = null;
    this.state = 'idle';
    this.direction = 1;
    this.isActive = false;
    this.hero = null;
    this.maxDistance = 15;
    this.distanceTravelled = 0;
  }

  attachHero(hero) {
    this.hero = hero;
  }

  fly() {
    if (this.state !== 'idle') return;
    if (!this.hero || !this.hero.isAlive) return;

    this.position = this.hero.position + 1;
    this.state = 'flying';
    this.direction = 1;
    this.isActive = true;
    this.distanceTravelled = 0;
  }

  update() {
    if (!this.isActive) return;

    this.position += this.direction;
    this.distanceTravelled += 1;

    if (this.state === 'flying') {
      if (this.distanceTravelled >= this.maxDistance) {
        this.state = 'returning';
        this.direction = -1;
      }
    }

    if (this.state === 'returning') {
      if (this.position <= this.hero.position) {
        this.reset();
      }
    }
  }

  reset() {
    this.state = 'idle';
    this.position = null;
    this.isActive = false;
    this.direction = 1;
    this.distanceTravelled = 0;
  }
}

module.exports = Boomerang;
