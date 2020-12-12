const fs = require('fs');
const instructions =
  fs.readFileSync('./input.txt', { encoding: 'utf8' })
    .trim()
    .split('\n')
    .map(instruction => ({
      direction: instruction[0],
      value: Number(instruction.slice(1))
    }));

class Ship {
  constructor() {
    this.currentDirection = 'E';
    this.currentAngle = 0;
    this.coords = {
      x: 0,
      y: 0
    }
  }

  move(direction, value) {
    switch (direction) {
      case 'N':
        this.coords.y += value;
        break;
      case 'S':
        this.coords.y -= value;
        break;
      case 'E':
        this.coords.x += value;
        break;
      case 'W':
        this.coords.x -= value;
        break;
      case 'F':
        this.move(this.currentDirection, value);
        break;
      case 'L':
        this.rotate(value);
        break;
      case 'R':
        this.rotate(360-value);
        break;
    }
  }

  rotate(value) {
    const newAngle = (this.currentAngle + value) % 360;
    this.currentAngle = newAngle;
    switch (newAngle) {
      case 0:
        this.currentDirection = 'E';
        break;
      case 90:
        this.currentDirection = 'N';
        break;
      case 180:
        this.currentDirection = 'W';
        break;
      case 270:
        this.currentDirection = 'S';
        break;
    }
  }

}

const label = "Ship Program"
console.time(label);
const ship = new Ship();

for (const { direction, value } of instructions) {
  ship.move(direction, value);
}

console.timeEnd(label);

console.log(Math.abs(ship.coords.x) + Math.abs(ship.coords.y))