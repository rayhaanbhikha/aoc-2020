const fs = require('fs');
const { Tile } = require('./tile');
const tiles = fs.readFileSync('./input-example.txt', { encoding: 'utf-8' }).trim().split('\n\n');

const tileSet = new Set();

const tileMap = tiles.reduce((acc, t) => {
  const tile = new Tile(t);
  tileSet.add(tile);
  return {
    ...acc,
    [tile.id]: tile
  }
}, {});

function getTilesExcluding(excludeTile) {
  return Object.entries(tileMap).filter(([key, tile]) => tile.id !== excludeTile.id);
}

const tileConnections = {};

const overallGrid = [[]]

const hasAnyMatches = (currentTile) => {
  console.log(currentTile.id);
  const remainingTiles = getTilesExcluding(currentTile);
  
  // let bordersMatched = false;
  let numOfMatches = 0;
  for (const [key, tile] of remainingTiles) {
    tile.gridBorderVals.forEach(borderVals => {
      if (currentTile.checkAgainstOtherTile(borderVals)) {
        numOfMatches++;
      }
    });
    console.log("trying: ", tile.id, "matches: ", numOfMatches);
  }
  if (numOfMatches === 2) {
    cornerTiles.push(currentTile);
  }
  return numOfMatches;
}

console.log(hasAnyMatches(tileMap['1951']))

// const getCornerTiles = () => {
//   const cornerTiles = [];
//   for (const [tileId, currentTile] of Object.entries(tileMap)) {
    
//   }
//   return cornerTiles;
// }

// console.log(getCornerTiles());
