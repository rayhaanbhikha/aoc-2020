const fs = require('fs');

// a = [a1, a2] , b = [[b0,b2], [b1, b3]]
const multiplyM = (a, b) => [a[0]*b[0][0]+a[1]*b[0][1], a[0]*b[1][0]+a[1]*b[1][1]]

class Ship {
  constructor() {
    this.coords = { x: 0,y: 0 }
    this.wayPoint = { x: 10, y: 1}
  }

  move(direction, value) {
    switch (direction) {
      case 'N': case 'E': case 'S': case 'W':
        this.moveWayPoint(direction, value);
        break;
      case 'F':
        this.moveShip(value);
        break;
      case 'L': case 'R':
        this.rotate(direction, value);
        break;
    }
  }

  moveShip(value) {
    this.coords.x += this.wayPoint.x * value;
    this.coords.y +=  this.wayPoint.y * value;
  }

  moveWayPoint(direction, value) {
    switch (direction) {
      case 'N':
        this.wayPoint.y += value;
        break;
      case 'S':
        this.wayPoint.y -= value;
        break;
      case 'E':
        this.wayPoint.x += value;
        break;
      case 'W':
        this.wayPoint.x -= value;
        break;
    }
  }

  rotate(direction, value) {
    let m;
    const mag = direction === 'R' ? 1 : -1;
    switch (value) {
      case 90:
        m = [[0, mag*1], [-1*mag, 0]]
        break
      case 180:
        m = [[-1, 0], [0, -1]]
        break;
      case 270:
        m = [[0, -1*mag], [1*mag, 0]]
        break;
      default:
        m = [[1, 0], [0, 1]]
        break;
    }
    const [x, y] = multiplyM([this.wayPoint.x, this.wayPoint.y], m);
    this.wayPoint.x = x;
    this.wayPoint.y = y;
  }

  manHattan() {
    return Math.abs(this.coords.x) + Math.abs(this.coords.y)
  }

}

const label = "Ship Program"
console.time(label);
const instructions =
  fs.readFileSync('./input.txt', { encoding: 'utf8' })
    .trim()
    .split('\n')
    .map(instruction => ({
      direction: instruction[0],
      value: Number(instruction.slice(1))
    }));

const ship = new Ship();

for (const { direction, value } of instructions) {
  ship.move(direction, value);
}

console.timeEnd(label);
console.log(ship.manHattan())