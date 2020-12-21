
const zeroes = new Array(10).fill(0);

class Tile {
  constructor(rawTileInput) {
    const [title, ...grid] = rawTileInput.split('\n');
    this.id = title.replace(':', '').replace('Tile ', '').trim();
    const g = grid.map(grid => grid.split(''));
    this.grid = g;
    this.originalGrid = g;
    this.leftIndexes = zeroes.map((_, index) => [index, 0]);
    this.rightIndexes = zeroes.map((_, index) => [index, this.grid.length - 1]);
    this.bottomIndexes = zeroes.map((_, index) => [this.grid.length - 1, index]);
    this.topIndexes = zeroes.map((_, index) => [0, index]);
  }

  get leftBorderVals() {
    return this.borderVals(this.leftIndexes);
  }

  get rightBorderVals() {
    return this.borderVals(this.rightIndexes);
  }

  get topBorderVals() {
    return this.borderVals(this.topIndexes);
  }

  get bottomBorderVals() {
    return this.borderVals(this.bottomIndexes);
  }

  reset() {
    this.grid = this.originalGrid;
  }

  borderVals(coords) {
    return coords.map(([x, y]) => this.grid[x][y]);
  }

  rotate() {

  }

  transpose() {
    for (let i = 0; i < this.grid.length; i++) {
      const element = this.grid[i];
      
    }
  }

  flipX() {
    for (let i = 0; i < this.grid.length / 2; i++) {
      let firstRow = this.grid[i];
      let lastRow = this.grid[this.grid.length - 1 - i];
      this.grid[i] = lastRow;
      this.grid[this.grid.length - 1 - i] = firstRow;
    }
  }

  flipY() {
    for (let j = 0; j < this.grid.length / 2; j++) {
      for (let i = 0; i < this.grid.length; i++) {
        const leftElement = this.grid[i][j];
        const rightElement = this.grid[i][this.grid.length - 1 - j];
        this.grid[i][j] = rightElement;
        this.grid[i][this.grid.length - 1 - j] = leftElement;
      }
    }
  }

  print() {
    console.log("Tile:",this.id)
    for (const row of this.grid) {
      for (const item of row) {
        process.stdout.write(item);
      }
      console.log('')
    }
  }
}

module.exports = {
  Tile
}