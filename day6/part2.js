const fs = require('fs');
const data = fs.readFileSync('./input.txt', { encoding: 'utf-8' }).split('\n\n').map(i => i.split('\n'));

const answer = data.reduce((acc,groupAnswers) => {
  const recordedGroupAnswers = {};
  groupAnswers.forEach(answers => {
    for (const a of answers) {
      recordedGroupAnswers[a] = recordedGroupAnswers[a] ? recordedGroupAnswers[a] + 1 : 1;
    }
  })
  let x = 0;
  for (const question in recordedGroupAnswers) {
    if (recordedGroupAnswers.hasOwnProperty(question)) {
      const element = recordedGroupAnswers[question];
      if (element === groupAnswers.length) {
        x++;
      }
    }
  }
  // console.log(recordedGroupAnswers, x);
  return acc + x;
}, 0)

console.log(answer);