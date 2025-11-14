// Импортируем всё необходимое.
// Или можно не импортировать,
// а передавать все нужные объекты прямо из run.js при инициализации new Game().

const Hero = require('./game-models/Hero');
const Enemy = require('./game-models/Enemy');
const Boomerang = require('./game-models/Boomerang');
const View = require('./View');
const CollisionManager = require('./game-models/CollisionManager');
const createKeyboard = require('./keyboard');

// Основной класс игры.
// Тут будут все настройки, проверки, запуск.

class Game {
  constructor({ trackLength, db }) {
    this.trackLength = trackLength;

    this.hero = new Hero({ position: 1 });
    this.enemy = new Enemy({ position: this.trackLength - 2 });
    this.boomerang = new Boomerang();

    this.hero.boomerang = this.boomerang;
    this.boomerang.attachHero(this.hero);

    this.collision = new CollisionManager({
      hero: this.hero,
      enemy: this.enemy,
      boomerang: this.boomerang,
    });

    this.view = new View(this);
    this.track = [];
    this.db = db;
    this.killedEnemies = 0;
    this.startTime = Date.now();
    this.regenerateTrack();
    
  }

  regenerateTrack() {
    // Сборка всего необходимого (герой, враг(и), оружие)
    // в единую структуру данных
    this.track = new Array(this.trackLength).fill(' ');

    if (
      this.boomerang.isActive &&
      this.boomerang.position >= 0 &&
      this.boomerang.position < this.trackLength
    ) {
      this.track[this.boomerang.position] = this.boomerang.skin;
    }

    if (this.hero.position >= 0 && this.hero.position < this.trackLength) {
      this.track[this.hero.position] = this.hero.skin;
    }

    if (
      this.enemy.isAlive &&
      this.enemy.position >= 0 &&
      this.enemy.position < this.trackLength
    ) {
      this.track[this.enemy.position] = this.enemy.skin;
    }
  }

  spawnNewEnemy() {
    this.enemy = new Enemy({ position: this.trackLength - 2 });
    this.collision.enemy = this.enemy;
  }

  updateEnemy() {
    if (!this.enemy.isAlive) return;

    this.enemy.moveLeft();

    if (this.enemy.position < 0 || this.enemy.position >= this.trackLength) {
      this.spawnNewEnemy();
    }
  }

  updateGameObjects() {
    this.updateEnemy();
    this.boomerang.update();
    this.collision.checkCollisions(this);
  }

  play() {
  const interval = setInterval(async () => {
    if (!this.hero.isAlive) {
      clearInterval(interval);

      const endTime = Date.now();
      const duration = Math.floor((endTime - this.startTime) / 1000);

      try {
        await this.db.Result.create({
          player_id: this.player.id,
          score: this.killedEnemies,
          time: duration,
        });

        console.log('\n\n===== РЕЗУЛЬТАТ СОХРАНЁН =====');
        console.log(`Player ID: ${this.player.id}`);
        console.log(`Killed enemies: ${this.killedEnemies}`);
        console.log(`Time: ${duration}s`);
      } catch (err) {
        console.error('Ошибка при сохранении:', err);
      }

      console.log('Game Over');
      return;
    }

    this.updateGameObjects();
    this.regenerateTrack();
    this.view.render(this.track);
  }, 200);
}

  renderFrame() {
    this.regenerateTrack();
    this.view.render(this.track);
  }

  startLoop() {
    console.clear();
    console.log('🎮 Game started!');
    createKeyboard(this);

    const interval = setInterval(() => {
      if (!this.hero.isAlive) {
        clearInterval(interval);
        console.log('💀 Game Over');
        return;
      }

      this.updateGameObjects();
      this.renderFrame();
    }, 200);
  }
}

module.exports = Game;
