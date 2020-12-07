const fs = require('fs');

const data = fs.readFileSync('./input.txt', { encoding: 'utf8' }).split('\n');

const bagsFound = new Set();
const queue = ['shiny gold'];

do {
  const bagToFind = queue.shift();
  const reg = new RegExp(` ${bagToFind} `, 's');

  const bagsWithShinyGoldBag = data.filter(d => reg.test(d));
  bagsFound.add(bagToFind);

  for (const bag of bagsWithShinyGoldBag) {
    const parentBag = bag.replace(/ bags contain[a-z0-9\ ].*$/g, '');
    if (!bagsFound.has(parentBag)) queue.push(parentBag);
  }
} while (queue.length !== 0);


console.log(bagsFound.size - 1);
