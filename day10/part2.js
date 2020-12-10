const fs = require('fs');
const jolts = fs.readFileSync('./input-example.txt', { encoding: 'utf8' }).trim().split('\n').map(n => Number(n)).sort((a, b) => a - b);

const lastJolt = jolts[jolts.length - 1];
jolts.push(lastJolt + 3);


for (const jolt of jolts) {
  console.log(jolt);
}


// let currentJolt = 0;
// for (const jolt of jolts) {
//   const diff = jolt - currentJolt;
//   differences[diff] = differences[diff] ? differences[diff] + 1 : 1;
//   currentJolt = jolt;
// }

// console.log(differences['1'] * differences['3']);

