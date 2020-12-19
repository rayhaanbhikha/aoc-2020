const { neighbourCoords } = require('./coord');

class Cube {
  constructor(value, coord) {
    this.coord = coord;
    this.value = value;
    this.nextValue = null;
    this.neighbourHoodCoords = neighbourCoords(coord, 1);
  }

  get isActive() {
    return this.value === '#';
  }

  setNextValue(grid3D) {
    const activeNeighbourCoords = this.neighbourHoodCoords.reduce((acc, nC) => grid3D.isActive(nC) ? acc + 1 : acc, 0);
    const status = this.isActive;
    if (status && (activeNeighbourCoords === 2 || activeNeighbourCoords === 3) ) {
      this.nextValue = '#';
    } else if (!status && activeNeighbourCoords === 3) {
      this.nextValue = '#';
    } else {
      this.nextValue = '.';
    }
  }

  update() {
    this.currentValue = this.nextValue;
    this.nextValue = null;
  }
}

module.exports = {
  Cube
}