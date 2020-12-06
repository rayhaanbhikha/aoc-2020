"use strict";
const fs = require('fs');

const stream = fs.createReadStream('./input.txt', { encoding: 'utf-8' });

// ~0.274ms
console.time("STREAM:")
const lineEndChar = '\n';
stream.on('readable', () => {
  let chunk;
  let prevChunk;
  let answers = 0;
  const groupsAnswers = new Set();

  while ((chunk = stream.read(1)) !== null) {
    if (prevChunk === lineEndChar && chunk === lineEndChar) {
      answers += groupsAnswers.size;
      groupsAnswers.clear();
    }

    if(chunk !== lineEndChar) groupsAnswers.add(chunk)

    prevChunk = chunk;
  }

  answers += groupsAnswers.size;
  console.log("Answer: ", answers);
  stream.destroy();
})
console.timeEnd("STREAM:")


const data = fs.readFileSync('./input.txt', { encoding: 'utf-8' }).split('\n\n').map(i => i.split('\n'));

// ~3.318ms
console.time("Loop:")
const answer = data.reduce((acc,groupAnswers) => {
  const set = new Set();
  groupAnswers.forEach(answers => {
    for (const a of answers) {
      if (!set.has(a)) {
        set.add(a);
      }
    }
  })
  return acc + set.size;;
}, 0)

console.log(answer);
console.timeEnd("Loop:")
