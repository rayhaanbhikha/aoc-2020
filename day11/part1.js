const fs = require('fs');
const data = fs.readFileSync('./input.txt', { encoding: 'utf8' }).split('\n');

const emptySeat = 'L';
const occupiedSeat = '#';
const floor = '.';

const adjacentSeatsCache = {}

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

    if (this.type === occupiedSeat && occupiedSeats >= 4) {
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


const getAdjacentSeats = (grid, currentRow, currentCol) => {
  const adjacentSeats = {
    'n': {
      i: currentRow - 1,
      j: currentCol
    },
    'ne': {
      i: currentRow - 1,
      j: currentCol + 1
    },
    'e': {
      i: currentRow,
      j: currentCol + 1
    },
    'se': {
      i: currentRow + 1,
      j: currentCol + 1
    },
    's': {
      i: currentRow + 1,
      j: currentCol
    },
    'sw': {
      i: currentRow + 1,
      j: currentCol - 1
    },
    'w': {
      i: currentRow,
      j: currentCol - 1
    },
    'nw': {
      i: currentRow - 1,
      j: currentCol - 1
    }
  };

  if (currentRow === 0) {
    delete adjacentSeats['n']
    delete adjacentSeats['nw']
    delete adjacentSeats['ne']
  }

  if (currentRow === grid.length - 1) {
    delete adjacentSeats['s']
    delete adjacentSeats['sw']
    delete adjacentSeats['se']
  }

  if (currentCol === 0) {
    delete adjacentSeats['nw']
    delete adjacentSeats['w']
    delete adjacentSeats['sw']
  }

  if (currentCol === grid[0].length - 1) {
    delete adjacentSeats['ne']
    delete adjacentSeats['e']
    delete adjacentSeats['se']
  }

  return adjacentSeats;
}

const runModel = (grid) => {
  const newGrid = [];
  let anySeatsFlipped = false
  
  for (let i = 0; i < grid.length; i++) {
    newGrid.push([])
    for (let j = 0; j < grid[i].length; j++) {

      const key = `${i}:${j}`;
      let adjacentSeats = adjacentSeatsCache[key];
      if (!adjacentSeats) {
        adjacentSeats = getAdjacentSeats(grid, i, j);
        adjacentSeatsCache[key] = adjacentSeats;
      }
      const seats = Object.entries(adjacentSeats).map(([_, index]) => {
        return grid[index.i][index.j]
      })
      const currentState = grid[i][j].type;
      const nextState = grid[i][j].nextState(seats);

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

let anySeatsFlipped;
let grid = createGrid(data);

do {
  const res = runModel(grid);
  grid = res.newGrid;
  anySeatsFlipped = res.anySeatsFlipped;
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

console.log(grid[0].length, grid.length);