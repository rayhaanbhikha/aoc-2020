const fs = require('fs');
const xyGrid = fs.readFileSync('./input-example.txt', { encoding: 'utf-8' })
  .trim().split('\n').map(i => i.split(''));

console.log(xyGrid);

class Coord {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

class Cube {
  constructor(value, coord) {
    this.coord = coord;
    this.value = value;
    this.nextValue = null;
  }

  get isActive() {
    return this.value === '#';
  }

  get possibleCoords(grid3D) {
    const { x, y, z} = this.coord;
    const possZ = [z - 1, z, z + 1]
    const possY = [y - 1, y, y + 1]
    const possX = [x - 1, x, x + 1]
    const possCoords = [];
    possZ.forEach(pz => {
      possY.forEach(py => {
        possX.forEach(px => {
          const coord = new Coord(px, py, pz);
          if (grid3D.checkCoordExists(coord)) {
            possCoords.push(coord)
          }
        })
      })
    });
    return possCoords;
  }

  update(grid3D) {
    // check all cubes around this guy.
    console.log()
    this.currentValue = this.nextValue;
  }
}

class Grid3d {
  constructor(initial2DGrid) {
    this.maxX = initial2DGrid[0].length;
    this.maxY = 
    this.grid = {
      '-1': 
      '0': initial2DGrid
    }
  }

  static init(xyGrid) {
    const grid = [];
    for (let i = 0; i < xyGrid.length; i++) {
      const gridRow = []
      for (let j = 0; j < xyGrid[0].length; j++) {
        gridRow.push(new Cube(xyGrid[i][j], new Coord(i, j, 0)));
      }
      grid.push(gridRow)
    }
    return new Grid3d(grid);
  } 

  addGrid(index, grid) {
    this.grid[index] = grid;
  }

  defaultGrid()

  get gridLayers() {
    return Object.entries(this.grid)
  }

  checkLayers() {
    for (const [index, grid] of this.gridLayers) {
      for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
          grid[i][j].update();
        }
        console.log();
      }



    }
  }

  checkCoordExists(coord) {
    return this.grid[coord.z] && this.grid[coord.z][coord.x][coord.y];
  }

  print() {
    for (const [index, grid] of this.gridLayers) {
      console.log("\nz=",index);
      for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
          process.stdout.write(grid[i][j].value);
        }
        console.log();
      }
    }
  }
}

const grid3D = Grid3d.init(xyGrid);

// console.log(grid3D);
grid3D.print()