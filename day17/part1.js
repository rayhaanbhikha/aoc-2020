const fs = require('fs');
const { Coord } = require('./coord')
const { Cube } = require('./cube')

const xyGrid = fs.readFileSync('./input-example.txt', { encoding: 'utf-8' })
  .trim().split('\n').map(i => i.split(''));
class Grid3d {
  constructor(initial2DGrid) {
    this.minZ = -1;
    this.maxZ = 1;
    this.grid = {
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

  addDefaultGrids() {
    const defaultGrid = 
    this.grid[this.minZ] = 
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
// grid3D.print()
const cube = new Cube('#', new Coord(0, 0, 0));

console.log(cube.neighbourHoodCoords)