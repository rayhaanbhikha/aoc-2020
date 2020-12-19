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

const generateVals = (origin, r) => new Array(r).fill(0).reduce((acc, _, index) => {
  acc.push(origin + (index + 1));
  acc.push(origin - (index + 1));
  return acc;
}, [origin])

const neighbourCoords = (coord, r) => {
  const { x, y, z} = coord;
  const possZ = generateVals(z, r);
  const possY = generateVals(y, r);
  const possX = generateVals(x, r);
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