"use strict";
const fs = require('fs');

const stream = fs.createReadStream('./input.txt', { encoding: 'utf-8' });

// ~0.276ms
console.time("STREAM:")
const lineEndChar = '\n';
stream.on('readable', () => {
  let chunk;
  let prevChunk;
  let answer = 0;
  let groupsAnswers = new Map();
  let groupSize = 0;

  const checkAnswers = () => Array.from(groupsAnswers.values()).reduce((acc, x) => x === groupSize ? acc + 1 : acc, 0)

  while ((chunk = stream.read(1)) !== null) {
    if ((prevChunk === undefined || prevChunk === lineEndChar) && chunk !== lineEndChar) groupSize++;

    if (prevChunk === lineEndChar && chunk === lineEndChar) {
      answer += checkAnswers();
      groupsAnswers.clear()
      groupSize = 0;
    }

    if (chunk !== lineEndChar) {
      const x = groupsAnswers.get(chunk)+1 || 1
      groupsAnswers.set(chunk, x);
    }

    prevChunk = chunk;
  }

  answer += checkAnswers();
  console.log("Answer stream: ", answer);
  stream.destroy();
})
console.timeEnd("STREAM:")


// ############################################################################################################

const data = fs.readFileSync('./input.txt', { encoding: 'utf-8' }).split('\n\n').map(i => i.split('\n'));

// using an object ~12.050ms
// using a map ~4.193ms
console.time("LOOP: ")
const recordedGroupAnswers = new Map();
const answer = data.reduce((acc, groupAnswers) => {
  recordedGroupAnswers.clear()
  groupAnswers.forEach(answers => {
    for (const a of answers) recordedGroupAnswers.set(a, recordedGroupAnswers.get(a)+1 || 1);
  })
  return acc + Array.from(recordedGroupAnswers.values()).reduce((acc, x) => x === groupAnswers.length ? acc + 1 : acc, 0);
}, 0)

console.log(answer);
console.timeEnd("LOOP: ")
