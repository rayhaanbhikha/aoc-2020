const fs = require('fs');
const { Tile } = require('./tile');
const tiles = fs.readFileSync('./input.txt', { encoding: 'utf-8' }).trim().split('\n\n');

const tileMap = tiles.reduce((acc, t) => {
  const tile = new Tile(t);
  return {
    ...acc,
    [tile.id]: tile
  }
}, {});

function getTilesExcluding(excludeTile) {
  return Object.entries(tileMap).filter(([key, tile]) => tile.id !== excludeTile.id);
}

const findMatches = (tile1, tile2) => {
  const matches = [];
  for (const tile1Border of tile1.allBorderVals) {
    for (const tile2Border of tile2.standardBorderVals) {
      if (tile1Border === tile2Border) {
        matches.push(tile1Border);
      }
    }
  }
  return matches;
}

const checkTile = (tile) => {
  let tileMatches = 0;
  for (const [_, otherTile] of getTilesExcluding(tile)) {
    if (findMatches(tile, otherTile).length > 0) {
      tileMatches++;
    }
  }
  return tileMatches;
}

let sum = 1n;
for (const [tileId, tile] of Object.entries(tileMap)) {
  if (checkTile(tile) === 2) {
    sum *= BigInt(Number(tileId));
  }
}

console.log(sum);
