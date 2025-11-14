// Управляет проверкой всех типов столкновений в игре.

class CollisionManager {
  constructor({ hero, enemy, boomerang }) {
    this.hero = hero;
    this.enemy = enemy;
    this.boomerang = boomerang;
  }

  checkCollisions(game) {
    this.checkHeroEnemyCollision();
    this.checkBoomerangEnemyCollision(game);
    this.checkEnemyReachedHero();
  }

  checkHeroEnemyCollision() {
    if (!this.hero.isAlive || !this.enemy.isAlive) return

    if (this.hero.position === this.enemy.position) {
      this.hero.die();
    }
  }

  checkBoomerangEnemyCollision(game) {
    if (!this.boomerang.isActive || !this.enemy.isAlive) return;
    if (this.boomerang.position == null) return;

    if (this.boomerang.position === this.enemy.position) {
      this.enemy.die();
      game.killedEnemies++;
    }
  }

  checkEnemyReachedHero() {
    if (!this.hero.isAlive || !this.enemy.isAlive) return;

    if (this.enemy.position < this.hero.position) {
        this.hero.die();
    }
  }
}

module.exports = CollisionManager;
