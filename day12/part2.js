const fs = require('fs');

// a = [a1, a2] , b = [[b0,b1], [b2, b3]]
const multiplyM = (a, b) => [a[0] * b[0][0] + a[1] * b[1][0], a[0] * b[0][1] + a[1] * b[1][1]]

const rotationMatrix = (mag, deg) => {
  const rads = deg * Math.PI / 180;
  const cos = Number(Math.cos(rads).toFixed(1)), sin = Math.floor(Math.sin(rads));
  return [ [cos, mag*-sin], [mag*sin, cos]]
}

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
        this.coords.x += this.wayPoint.x * value;
        this.coords.y +=  this.wayPoint.y * value;
        break;
      case 'L': case 'R':
        const r = rotationMatrix(direction === 'R' ? 1 : -1, value);
        const [x, y] = multiplyM([this.wayPoint.x, this.wayPoint.y], r);
        this.wayPoint = { x, y };
        break;
    }
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

for (const { direction, value } of instructions)
  ship.move(direction, value);

console.timeEnd(label);
console.log(ship.manHattan())