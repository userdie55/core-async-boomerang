// Наш герой.

class Hero {
  constructor({ position }) {
    this.skin = '🤠'; // можете использовать любые emoji '💃'
    this.position = position;
    this.isAlive = true
    this.gameOver = false
  }

  moveLeft() {
    // Идём влево.
    if (!this.isAlive) return
    this.position -= 1;
  }

  moveRight() {
    // Идём вправо.
    if (!this.isAlive) return
    this.position += 1;
  }

  attack() {
    // Атакуем.
    if (!this.isAlive) return
    this.boomerang.fly();
  }

  die() {
    this.isAlive = false
    this.skin = '💀';
    this.gameOver = true
    console.log('YOU ARE DEAD!💀');
  }
}

module.exports = Hero;
