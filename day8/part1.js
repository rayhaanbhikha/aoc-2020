const fs = require('fs');

const instructionSet = fs.readFileSync('./input.txt', { encoding: 'utf8' }).split('\n').map(ins => { const [code, val] = ins.split(' '); return { code, val: Number(val)}});

let globalValue = 0;
let accIndex = 0;

const commandIndexRan = new Set();

do {
  const { code, val } = instructionSet[accIndex];
  commandIndexRan.add(accIndex);
  switch (code) {
    case 'nop':
      accIndex++;
      break;
    case 'jmp':
      accIndex += val
      break;
    case 'acc':
      accIndex++;
      globalValue += val;
      break;
  }
} while (!commandIndexRan.has(accIndex));

console.log(globalValue);
