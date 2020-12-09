const fs = require('fs');
const numbers = fs.readFileSync('./input.txt', { encoding: 'utf8' }).split('\n').map(n => Number(n));

const findPair = (numbers, target) => {
  const formattedNums = numbers.sort((a, b) => a - b);
  const n = numbers.length;
  let leftIndex = 0, rightIndex = n - 1;
  while (leftIndex < rightIndex) {
    const sum = formattedNums[leftIndex] + formattedNums[rightIndex];
    if (sum === target) {
      return true;
    } else if (sum < target) {
      leftIndex++
    } else if (sum > target) {
      rightIndex--
    }
  }
  return false;
}

for (let i = 25; i < numbers.length; i++) {
  const x = numbers.slice(i - 25, i)
  if (!findPair(x, numbers[i])) {
    console.log(numbers[i]);
    break;
  }
}
