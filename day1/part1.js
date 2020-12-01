const fs = require('fs');

const input = fs.readFileSync('./input.txt', { encoding: 'utf8' });

const expenses = input.split('\n').sort((a, b) => Number(a) - Number(b));

// order the expenses.

// two sum algorithm.
const target = 2020;

let sum = 0;
let leftIndex=0;
let rightIndex = expenses.length - 1;
let right;
let left;
console.log(expenses);
do {
  right = expenses[rightIndex];
  left = expenses[leftIndex];

  sum = Number(right) + Number(left);

  if (sum < target) {
    leftIndex++
  } else if (sum > target) {
    rightIndex--
  }
} while (sum != target);

console.log("FINAL: left: ", left, "  --  right: ", right, left * right);

