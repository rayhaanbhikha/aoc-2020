const fs = require('fs');
const { Tile } = require('./tile');
const tiles = fs.readFileSync('./input-example.txt', { encoding: 'utf-8' }).trim().split('\n\n');



const tileMap = tiles.reduce((acc, t) => {
  const tile = new Tile(t);
  return {
    ...acc,
    [tile.id]: tile
  }
}, {});

// const checkTileTopBorder = (tile)

const tile0 = new Tile(tiles[0]);
tile0.print()
tile0.rotate(90);
tile0.print()
// console.log(Object.keys(tileMap));
// const tile = tileMap['1951'];
// console.log(tiles.length);

// console.log(tile.bottomBorderVals)




// console.log(tile0.leftBorderVals);
// console.log(tile0.rightBorderVals);
// console.log(tile0.topBorderVals);
// console.log(tile0.bottomBorderVals);
// console.log();