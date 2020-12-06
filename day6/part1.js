const fs = require('fs');
const data = fs.readFileSync('./input.txt', { encoding: 'utf-8' }).split('\n\n').map(i => i.split('\n'));

// for (const groupanswers of data) {
//   console.log(groupanswers)
// }
// console.log(data);

const answer = data.reduce((acc,groupAnswers) => {
  // console.log(groupAnswers);
  const set = new Set();
  groupAnswers.forEach(answers => {
    for (const a of answers) {
      if (!set.has(a)) {
        set.add(a);
      }
    }
  })
  // console.log(set.size);
  return acc + set.size;;
}, 0)

console.log(answer);