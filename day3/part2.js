const fs = require('fs');

const grid = fs.readFileSync('./input.txt', { encoding: 'utf-8' }).split('\n');

const rowLength = grid[0].length;
const colLength = grid.length - 1;

class Toboggan{
  constructor(moveXRight, moveXDown) {
    this.moveXRight = moveXRight;
    this.moveXDown = moveXDown;
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
    this.x += this.moveXRight;
  }

  moveDown() {
    this.y += this.moveXDown;
  }

  get nextYCoord() {
    return this.y + this.moveXDown;
  }
}

function getTreesEncountered(moveXRight, moveXDown) {
  const toboggan = new Toboggan(moveXRight, moveXDown);
  let treesEncountered = 0;
  do {
    toboggan.move();
    const { x, y } = toboggan.position;
    const positionOnGrid = grid[y][x];
    if (positionOnGrid === '#') {
      treesEncountered++;
    }
  } while (toboggan.nextYCoord < colLength);
  return treesEncountered;
}

const slopes = [
  getTreesEncountered(1, 1),
  getTreesEncountered(3, 1),
  getTreesEncountered(5, 1),
  getTreesEncountered(7, 1),
  getTreesEncountered(1, 2),
];

const answer = slopes.reduce((acc, x) => acc * x, 1)

console.log(answer);