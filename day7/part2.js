const fs = require('fs');

const data = fs.readFileSync('./input.txt', { encoding: 'utf8' }).split('\n');

const bags = {}
const r = new RegExp(/(^[0-9]{1})\ ([a-z].*)/, 's');

const queue = ['shiny gold'];

do {
  const bagToFind = queue.shift();
  const reg = new RegExp(`^${bagToFind} `, 's');

  const bagsWithShinyGoldBag = data.filter(d => reg.test(d));

  for (const bag of bagsWithShinyGoldBag) {
    if (bag.includes('bags contain no other bags')) {
      bags[bagToFind] = 0
      continue;
    }
    const childBags = bag.replace(/^(.*bags contain\ )|(\ bag,\ |\ bags,\ |\ bag.|\ bags.)|(\.)/g, ',').split(',').filter(x => x);
    bags[bagToFind] = childBags.map(childBag => {
      const res = r.exec(childBag);
      queue.push(res[2]);
      return {
        quant: res[1],
        childBag: res[2]
      }
    })
  }
}while( queue.length !== 0 )

// console.log(numberOfChildBags('vibrant plum'))
console.log(bags)

function computeNumOfBags(bags, value) {
  const res = bags[value];
  if (res === 0) {
    return 1
  }

  return res.reduce((acc, currentRes) => {
    const { quant, childBag } = currentRes;
    const res = computeNumOfBags(bags, childBag);
    const x = res > 1 ? Number(quant) + Number(quant) * res : Number(quant) * res
    return acc + x;
  }, 0);
}

console.log(computeNumOfBags(bags, 'shiny gold'))





// console.log(Object.keys(bagsFound).length - 1);
