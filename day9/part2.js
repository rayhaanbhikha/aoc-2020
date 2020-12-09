const fs = require('fs');
const numbers = fs.readFileSync('./input.txt', { encoding: 'utf8' }).split('\n').map(n => Number(n));

const target = 36845998

const addNums = numbers => numbers.reduce((acc, s) => acc + s, 0);

const window = [];
let numIndex = 0;

while (true) {
  const number = numbers[numIndex]

  if (window.length < 2) {
    window.push(number);
    numIndex++;
    continue;
  }

  const res = addNums(window);

  if (res + number === target) {
    window.push(number);
    break;
  }

  if (res + number < target) {
    window.push(number);
    numIndex++;
  }

  if (res + number > target) window.shift();
}

const x = window.sort((a, b) => a - b);

console.log(x[0] + x[x.length - 1]);

