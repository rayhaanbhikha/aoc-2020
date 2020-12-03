const fs = require('fs');

const grid = fs.readFileSync('./input.txt', { encoding: 'utf-8' }).split('\n');

const rowLength = grid[0].length;
const colLength = grid.length - 1;

class Toboggan{
  constructor() {
    this.x = 0
    this.y = 0
  }

  get position() {
    return {
      x: this.x % rowLength,
      y: this.y
    }
  }

  move() {
    this.moveRight();
    this.moveDown();
  }

  moveRight() {
    this.x += 3;
  }

  moveDown() {
    this.y += 1;
  }
}

const toboggan = new Toboggan();
let treesEncountered = 0;
do {
  toboggan.move();
  const { x, y } = toboggan.position;
  const positionOnGrid = grid[y][x];
  if (positionOnGrid === '#') {
    treesEncountered++;
  }
} while (toboggan.y < colLength);

console.log(treesEncountered);