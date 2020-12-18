const { neighbourCoords } = require('./coord');

class Cube {
  constructor(value, coord) {
    this.coord = coord;
    this.value = value;
    this.nextValue = null;
    this.neighbourHoodCoords = neighbourCoords(coord);
  }

  get isActive() {
    return this.value === '#';
  }

  update(grid3D) {
    this.currentValue = this.nextValue;
  }
}

module.exports = {
  Cube
}