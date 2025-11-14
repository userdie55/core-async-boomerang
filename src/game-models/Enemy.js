// Враг.

class Enemy {
  constructor() {
    this.generateSkin();
    this.position = 25;
  }

  generateSkin() {
    const skins = ['👾', '💀', '👹', '👻', '👽', '👿', '💩', '🤡', '🤺', '🧛', '🧟', '🎃'];
    this.skin = skins[Math.floor(Math.random() * skins.length)];
  }

  respawn() {
    this.position = this.trackLength - 1;
    this.y = Math.floor(Math.random() * this.height);
    this.generateSkin();
  }

  moveLeft() {
    this.position = Math.max(0, this.position - 1);
  }

  die() {
    this.skin = '💀';
    console.log('Enemy is dead!');
  }
}

module.exports = Enemy;
