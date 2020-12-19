const fs = require('fs');
const { Coord, neighbourCoords } = require('./coord')
const { Cube } = require('./cube')

const xyGrid = fs.readFileSync('./input-example.txt', { encoding: 'utf-8' })
  .trim().split('\n').map(i => i.split(''));

class Grid3d {
  constructor(initial2DGrid) {
    this.radius = 2;
    this.origin = new Coord(0, 0, 0);
    this.cubes = {};
    this.init(initial2DGrid);
  }

  generateKey(coord) {
    const { x, y, z } = coord;
    return `${x}:${y}:${z}`;
  }

  addCube(cube) {
    const key = this.generateKey(cube.coord);
    this.cubes[key] = cube;
  }

  getCube(coord) {
    const key = this.generateKey(coord);
    return this.cubes[key];
  }

  init(xyGrid) {
    for (let i = 0; i < xyGrid.length; i++) {
      for (let j = 0; j < xyGrid[0].length; j++) {
        const element = xyGrid[i][j];
        if (element === '#') {
          const cube = new Cube(element, new Coord(i, j, 0));
          this.addCube(cube);
        }
      }
    }
  }

  // checkLayers() {
  //   this.grid[this.minZ] = this.defaultGrid(this.minZ);
  //   this.grid[this.maxZ] = this.defaultGrid(this.maxZ);

  //   for (const [index, grid] of this.gridLayers) {
  //     for (let i = 0; i < grid.length; i++) {
  //       for (let j = 0; j < grid[0].length; j++) {
  //         grid[i][j].setNextValue(this);
  //       }
  //     }
  //   }
  // }

  // updateLayers() {
  //   for (const [index, grid] of this.gridLayers) {
  //     for (let i = 0; i < grid.length; i++) {
  //       for (let j = 0; j < grid[0].length; j++) {
  //         grid[i][j].update();
  //       }
  //     }
  //   }
  // }

  // isActive(coord) {
  //   if (this.grid[coord.z] && this.grid[coord.z][coord.x][coord.y]) {
  //     const element = this.grid[coord.z][coord.x][coord.y];
  //     return element === '#';
  //   }
  //   return false;
  // }

  coordsToCheck() {
    const coordsToCheck = neighbourCoords(this.origin, this.radius);
    return coordsToCheck;
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

const grid3D = new Grid3d(xyGrid);

console.log(grid3D.coordsToCheck())
// grid3D.checkLayers();

// grid3D.print()