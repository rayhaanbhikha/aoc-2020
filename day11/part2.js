const fs = require('fs');
const data = fs.readFileSync('./input.txt', { encoding: 'utf8' }).split('\n');

const emptySeat = 'L';
const occupiedSeat = '#';
const floor = '.';

const directionsCache = {};

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  increaseDistance(magnitude) {
    this.x += magnitude;
    this.y += magnitude;
  }
}

const directions = new Set([
  Vector(-1, -1), // nw
  Vector(0, -1), //n
  Vector(1, -1), //ne
  Vector(0, 1), // e
  Vector(1, 1), // se
  Vector(1, 0), // s
  Vector(1, -1), // sw
  Vector(0, -1), // w
])

class Position {
  constructor(initialType, i, j) {
    this.type = initialType;
    this.i = i;
    this.j = j;
  }

  shouldFlip(adjacentSeats) {
    const occupiedSeats = adjacentSeats.reduce((acc, pos) => {
      if (pos.type === occupiedSeat) {
        acc++;
      }
      return acc;
    }, 0);

    if (this.type === emptySeat && occupiedSeats === 0) {
      return true;
    }

    if (this.type === occupiedSeat && occupiedSeats >= 5) {
      return true;
    }

    return false;
  }

  nextState(adjacentSeats) {
    if (this.shouldFlip(adjacentSeats)) {
      return this.type === emptySeat ? occupiedSeat : emptySeat;
    }
    return this.type;
  }

}

const printGrid = (grid) => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      process.stdout.write(grid[i][j].type);
    }
    console.log('');
  }
}

const createGrid = (data) => {
  const grid = [];
  // i row, j col
  for (let i = 0; i < data.length; i++) {
    grid.push([]);
    for (let j = 0; j < data[i].length; j++) {
      const seatType = data[i][j];
      grid[i][j] = new Position(seatType, i, j);
    }
  }
  return grid;
}

const getAdjacentSeats = (grid, currentRow, currentCol) => {
  const seats = [];
  const directions = new Set(['n','ne','e','se','s','sw','w','nw']);
  for (let r = 1; directions.size !== 0; r++) {
    directions.forEach(direction => {
      let newRow = currentRow;
      let newCol = currentCol;
      switch (direction) {
        case 'n':
          newRow -= r;
          break;
        case 'ne':
          newRow -= r;
          newCol += r;
          break;
        case 'e':
          newCol += r;
          break;
        case 'se':
          newRow += r;
          newCol += r;
          break;
        case 's':
          newRow += r;
          break;
        case 'sw':
          newRow += r;
          newCol -= r;
          break;
        case 'w':
          newCol -= r;
          break;
        case 'nw':
          newRow -= r;
          newCol -= r;
          break;
      }

      // out of bounds;
      if (newRow >= 0 && newRow <= grid.length - 1 && newCol >= 0 && newCol <= grid[0].length - 1) {
        if (grid[newRow][newCol].type === occupiedSeat || grid[newRow][newCol].type === emptySeat) {
          directions.delete(direction);
          seats.push(grid[newRow][newCol])
        }
      } else {
        directions.delete(direction);
      }
    })
  }
  return seats;
}

const runModel = (grid) => {
  const newGrid = [];
  let anySeatsFlipped = false
  
  for (let i = 0; i < grid.length; i++) {
    newGrid.push([])
    for (let j = 0; j < grid[i].length; j++) {
      const adjacentSeats = getAdjacentSeats(grid, i, j);
      const currentState = grid[i][j].type;
      const nextState = grid[i][j].nextState(adjacentSeats);

      if (currentState !== nextState) {
        anySeatsFlipped = true;
      }

      newGrid[i][j] = new Position(nextState, i, j);
    }
  }

  return {
    newGrid,
    anySeatsFlipped,
  }
}

let anySeatsFlipped;
let grid = createGrid(data);

console.log(getAdjacentSeats(grid, 3, 3))


let i = 1;
do {
  const res = runModel(grid);
  grid = res.newGrid;
  anySeatsFlipped = res.anySeatsFlipped;
  i++;
} while (anySeatsFlipped);

printGrid(grid);

let occupiedSeats = 0;
for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    if (grid[i][j].type === occupiedSeat) {
      occupiedSeats++;
    }
  }
}

console.log(occupiedSeats);