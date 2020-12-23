
const zeroes = new Array(10).fill(0);

const getBorderVals = (grid, coords) => coords.map(([x, y]) => grid[x][y]);

class Tile {
  constructor(rawTileInput) {
    const [title, ...rawGrid] = rawTileInput.split('\n');
    this.id = title.replace(':', '').replace('Tile ', '').trim();
    const grid = rawGrid.map(grid => grid.split(''));
    this.originalGrid = grid;
    // T, R, B, L - indexed.
    const gridBorderVals = [
      getBorderVals(grid, zeroes.map((_, index) => [0, index])),
      getBorderVals(grid, zeroes.map((_, index) => [index, grid.length - 1])),
      getBorderVals(grid, zeroes.map((_, index) => [grid.length - 1, index])),
      getBorderVals(grid, zeroes.map((_, index) => [index, 0])),
    ];
    this.gridBorderVals = gridBorderVals
    this.originalGridBorderVals = gridBorderVals
  }

  get allBorderVals() {
    return this.gridBorderVals.reduce((acc, borderVals) => [...acc, borderVals.join(''), borderVals.reverse().join('')], []);
  }

  get standardBorderVals() {
    return this.gridBorderVals.reduce((acc, borderVals) => [...acc, borderVals.join('')], []);
  }
  
  get topBorderVals() {
    return this.gridBorderVals[0];
  }

  get rightBorderVals() {
    return this.gridBorderVals[1];
  }

  get bottomBorderVals() {
    return this.gridBorderVals[2];
  }

  get leftBorderVals() {
    return this.gridBorderVals[3];
  }

  reset() {
    this.gridBorderVals = this.originalGridBorderVals;
  }

  rotate(deg) {
    switch (deg) {
      case 90:
        this.gridBorderVals.push(this.gridBorderVals.shift());
        break;
      case 180:
        this.gridBorderVals.push(this.gridBorderVals.shift(), this.gridBorderVals.shift());
        break;
      case 270:
        this.gridBorderVals.unshift(this.gridBorderVals.pop())
        break;
    }
  }

  flipX() {
    const temp = this.topBorderVals;
    this.topBorderVals = this.bottomBorderVals;
    this.bottomBorderVals = temp;
  }

  flipY() {
    const temp = this.leftBorderVals;
    this.leftBorderVals = this.rightBorderVals;
    this.rightBorderVals = temp;
  }

  print() {
    console.log("Tile:", this.id)
    // print top.
    for (const item of this.topBorderVals) {
      process.stdout.write(item)
    }
    console.log('');
    for (let i = 1; i < this.originalGrid.length - 1; i++) {
      process.stdout.write(this.leftBorderVals[i])
      for (let j = 1; j < this.originalGrid.length - 1; j++) {
        process.stdout.write(' ');
      }
      process.stdout.write(this.rightBorderVals[i])
      console.log('')
    }
    for (const item of this.bottomBorderVals) {
      process.stdout.write(item)
    }
    console.log('');
  }
}

module.exports = {
  Tile
}