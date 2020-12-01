const fs = require('fs');

const input = fs.readFileSync('./input.txt', { encoding: 'utf8' });

const expenses = input.split('\n').sort((a, b) => Number(a) - Number(b)).map(n => Number(n));

// two sum algorithm.
const target = 2020;
const n = expenses.length;
let answer = 0;

for (let i = 0; i < n; i++) {
  for (let j = i + 1; j < n; j++) {
    for (let k = j + 1; k < n; k++) {
      const sum = expenses[i] + expenses[j] + expenses[k];
      if (sum === target) {
        answer = expenses[i] * expenses[j] * expenses[k];
        break;
      }
    }
  }
}

console.log(answer);