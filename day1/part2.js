const fs = require('fs');

const input = fs.readFileSync('./input.txt', { encoding: 'utf8' });

const expenses = input.split('\n').map(n => Number(n)).sort((a, b) => a - b);
// const expenses = [
// 1721,
// 979,
// 366,
// 299,
// 675,
// 1456,
// ].sort((a, b) => Number(a) - Number(b))

// two sum algorithm.
const target = 2020;
const n = expenses.length;

let sum = 0;


const defaultPartition = Math.floor(n / 3);
// const finalPartition = n - defaultPartition * 2;

let left = {
  value: undefined,
  index: 0,
}

let middle = {
  value: undefined,
  index: defaultPartition,
}

let right = {
  value: undefined,
  index: n - 1,
}

console.table({ left, middle, right })

do {
  right.value = expenses[right.index];
  middle.value = expenses[middle.index];
  left.value = expenses[left.index];
  // console.table({ left, middle, right })

  sum = left.value + middle.value + right.value;
  console.log({ sum })
  console.log("\n============\n\n");



  const diffRightMid = right.index - middle.index;
  const diffMidLeft = middle.index - left.index;

  if (sum < target) {
    // left index is less than mid index by more than 1.
    if (diffMidLeft > 1) {
      left.index++
    } else if (diffRightMid > 1) {
      middle.index++
    } else if (right.index != n - 1) {
      right.index++
    }
    // move either left or middle up.
  } else if (sum > target) {
    // right index can only go down so far.
    
    if (diffRightMid > 1) {
      right.index--
    } else if (diffMidLeft > 1) {
      middle.index--
    } else if (left.index !== 0) {
      left.index--
    }
  }
  console.table({ left, middle, right })
} while (sum != target);

// console.log("FINAL: left: ", left, "  --  right: ", right, left * right);

