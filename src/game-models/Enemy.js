// Враг.

class Enemy {
  constructor({ position } = {}) {
    this.generateSkin();
    this.position = position;
    this.isAlive = true
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
    if (!this.isAlive) return
    this.position -= 1;
  }

  die() {
    this.isAlive = false
    this.position = null;
    console.log('Enemy is dead!');
  }
}

module.exports = Enemy;
