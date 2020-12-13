const fs = require('fs');
const [departureTime, busIDs] =
  fs.readFileSync('./input.txt', { encoding: 'utf8' })
    .trim()
    .split('\n')
    .map((i, index) => index === 0 ? i : i.split(',').filter(busID => busID !== 'x'));

console.log(departureTime);
console.log(busIDs);

function findClosest(busId) {
  let currentTime = Number(departureTime);
  while (currentTime % busId !== 0) {
    currentTime++
  }
  return currentTime - departureTime
}

let smallestDistance = 0;
let busId = '';

for (const busID of busIDs) {
  const res = findClosest(busID)
  if (smallestDistance === 0 || res < smallestDistance) {
    smallestDistance = res;
    busId = busID
  }
}

console.log(smallestDistance);
console.log(busId * smallestDistance);

// busIDs.forEach(busId => {




// })