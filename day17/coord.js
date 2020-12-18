class Coord {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  static isEqual(coord1, coord2) {
    return coord1.x === coord2.x && coord1.y === coord2.y && coord1.z === coord2.z;
  }
}

const neighbourCoords = (coord) => {
  const { x, y, z} = coord;
  const possZ = [z - 1, z, z + 1]
  const possY = [y - 1, y, y + 1]
  const possX = [x - 1, x, x + 1]
  const possCoords = [];
  possZ.forEach(pz => {
    possY.forEach(py => {
      possX.forEach(px => {
        const newCoord = new Coord(px, py, pz);
        if (!Coord.isEqual(newCoord, coord)) {
          possCoords.push(newCoord)
        }
      })
    })
  });
  return possCoords;
}

module.exports = {
  neighbourCoords,
  Coord
}