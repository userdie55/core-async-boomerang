// Сделаем отдельный класс для отображения игры в консоли.

// View.js
class View {
  constructor(game) {
    this.game = game;
    this.levels = 4;
  }

  createEmptyField() {
    const width = this.game.track.length;
    const height = this.levels;
    const field = [];
    for (let y = 0; y < height; y++) {
      field.push(Array(width).fill(' '));
    }
    return field;
  }

  placeObject(field, obj) {
    if (!obj) return;
    const x = obj.position;      
    const y = obj.level ?? 0; 
    if (field[y] && field[y][x] !== undefined) {
      field[y][x] = obj.skin;
    }
  }

  render() {
    console.clear()
    const field = this.createEmptyField();

    this.placeObject(field, this.game.hero);
    this.placeObject(field, this.game.enemy);
    this.placeObject(field, this.game.boomerang);

    const border = '─'.repeat(this.game.track.length);
    console.log(border);
    
    for (const row of field) {
      console.log(row.join(''));
    }

    console.log(border);
    console.log('\nCreated with love');
  }
}

module.exports = View;

