const fs = require('fs');
const instructions =
  fs.readFileSync('./input.txt', { encoding: 'utf8' })
    .trim()
    .split('\n')
    .map(instruction => ({
      direction: instruction[0],
      value: Number(instruction.slice(1))
    }));

console.log(instructions);



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
        this.computeForward(value);
        break;
      case 'L':
        this.rotate(value);
        break;
      case 'R':
        this.rotate(360-value);
        break;

    }
  }

  move2(direction, value) {
    switch (direction) {
      case 'N':
        this.coords.y += value;
        break;
      case 'S':
        this.coords.y += value;
        break;
      case 'E':
        this.coords.x += value;
        break;
      case 'W':
        this.coords.x += value;
        break;
      case 'F':
        this.computeForward(value);
        break;
      case 'L':
        this.rotate(value);
        break;
      case 'R':
        this.rotate(360-value);
        break;

    }
  }

  computeForward(value) {
    const magnitude = this.currentDirection === 'S' || this.currentDirection === 'W' ? -1 : 1;

    this.move2(this.currentDirection, value * magnitude);
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

const ship = new Ship();
// // F10
// // N3
// // F7
// // R90
// // F11
// ship.move('F', 10);
// console.log(ship.coords);
// ship.move('N', 3);
// console.log(ship.coords);
// ship.move('F', 7);
// console.log(ship.coords);
// ship.move('R', 90);
// console.log(ship.coords);
// ship.move('F', 11);

// console.log(ship.coords);

for (const { direction, value } of instructions) {
  ship.move(direction, value);
}

console.log(Math.abs(ship.coords.x) + Math.abs(ship.coords.y))