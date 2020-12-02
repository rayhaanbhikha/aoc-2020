const fs = require('fs');
const passwords = fs.readFileSync('./input.txt', { encoding: 'utf-8' }).trim().split('\n');

const reg = new RegExp(/^([0-9]{1,2})-([0-9]{1,2})\ (\w{1}):\ ([a-z]+)$/, 'i')

let correctPassword = 0;

for (const passwordInfo of passwords) {
  const [_, pos1, pos2, char, password] = reg.exec(passwordInfo);

  const isPos1Char = password[Number(pos1)-1] === char;
  const isPos2Char = password[Number(pos2)-1] === char;

  if (isPos1Char && !isPos2Char || !isPos1Char && isPos2Char) correctPassword++
}

console.log(correctPassword);