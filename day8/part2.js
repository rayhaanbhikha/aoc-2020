const fs = require('fs');

const instructionSet = fs.readFileSync('./input.txt', { encoding: 'utf8' }).split('\n').map(ins => { const [code, val] = ins.split(' '); return { code, val: Number(val)}});

const nopAndJumpInstructions = instructionSet.reduce((acc, ins, index) => {
  if (ins.code === 'nop' || ins.code === 'jmp') {
    acc.push(index);
  }
  return acc;
}, [])


console.log(nopAndJumpInstructions);

function runInstruction(indexToFlipAt) {
  let globalValue = 0;
  let accIndex = 0;
  
  const commandIndexRan = new Set();
  let instructionSetComplete = false;
  do {
    if (accIndex >= instructionSet.length) {
      instructionSetComplete = true;
      break;
    }

    let { code, val } = instructionSet[accIndex];

    if (accIndex === indexToFlipAt) {
      // check code.
      if (code === 'nop' && val !== 0) {
        code = 'jmp';
      } else if (code === 'jmp') {
        code = 'nop';
      }
    }

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

  return {
    value: globalValue,
    isComplete: instructionSetComplete
  }
}

for (const index of nopAndJumpInstructions) {
  const { value, isComplete } = runInstruction(index);
  if (isComplete) {
    console.log("VAL: ", value);
    break;
  }
  // console.log(runInstruction(index));
}
