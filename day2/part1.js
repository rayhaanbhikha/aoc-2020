const fs = require('fs');
const passwords = fs.readFileSync('./input.txt', { encoding: 'utf-8' }).trim().split('\n');

const reg = new RegExp(/^([0-9]{1,2})-([0-9]{1,2})\ (\w{1}):\ ([a-z]+)$/, 'i')

const checkOccurence = (char, str) => {
  let sum = 0;
  for (const currentChar of str) {
    if (currentChar === char) sum++;
  }
  return sum;
}

let correctPassword = 0;

for (const passwordInfo of passwords) {
  const [_, min, max, char, password] = reg.exec(passwordInfo);

  const minimum = Number(min);
  const maximum = Number(max);

  const charOccurence = checkOccurence(char, password);

  if (charOccurence >= minimum && charOccurence <= maximum) {
    correctPassword++
  }
}

console.log(correctPassword);