const fs = require('fs');
const codes = fs.readFileSync('./input.txt', { encoding: 'utf-8' }).split('\n');

class Range{
  constructor(min, max) {
    this.min = min;
    this.max = max;
  }

  splitUpper() {
    this.min += Math.ceil((this.max - this.min)/2)
  }

  splitLower() {
    this.max -= Math.ceil((this.max - this.min)/2)
  }
}

function getSeatId(code) {
  const rowRange = new Range(0, 127);
  const colRange = new Range(0, 7);
  for (const char of code) {
    switch (char) {
      case 'F':
        rowRange.splitLower()
        break;
      case 'B':
        rowRange.splitUpper()
        break;
      case 'R':
        colRange.splitUpper();
        break;
      case 'L':
        colRange.splitLower();
        break;
    }
  }
  return rowRange.min * 8 + colRange.min
}

const seatIds = codes.map(getSeatId);

const sortedSeatIds = seatIds.sort((a, b) => a - b);

let expectedSeatId = sortedSeatIds[0];

for (const seatId of sortedSeatIds) {
  if (seatId !== expectedSeatId) {
    console.log("Missing seat id: ", expectedSeatId);
    break;
  }
  expectedSeatId = seatId + 1
}
