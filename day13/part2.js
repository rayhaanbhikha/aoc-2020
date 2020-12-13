const fs = require('fs');
const busIDsInput =
  fs.readFileSync('./input-example.txt', { encoding: 'utf8' })
    .trim()
    .split('\n')[1]
    .split(',');

// last number: 41419100000000
// 7,13,x,x,59,x,31,19
// const busIDsInput = [67,7,59,61]
// const busIDsInput = [67,'x',7,59,61]
// const busIDsInput = [67,7,'x',59,61]
// const busIDsInput = [1789,37,47,1889]

let maxBusID = 0;
let maxBusIndex = 0;
const busIDs = busIDsInput.reduce((busIDs, busID, index) => {
  if (busID === 'x') return busIDs;
  if (Number(busID) > maxBusID) {
    maxBusID = Number(busID);
    maxBusIndex = index;
  }
  return [...busIDs, { id: Number(busID), index }]
}, [])

const remainingBusIds = busIDs.filter(busID => busID.id !== maxBusID);

// console.log(busIDsInput);
console.log(remainingBusIds)
console.log(maxBusID)
console.log(maxBusIndex)

const checkBusIds = (t, index) => {
  const startTime = t - index;
  const endTime = busIDsInput.length - 1 - index + t;
  const end = (endTime) % busIDs[busIDs.length - 1].id === 0
  if (!end) {
    return false;
  }

  const x = remainingBusIds.reduce((acc, bus) => {
    if ((startTime + bus.index) % bus.id === 0) {
      acc++
    }
    return acc;
  }, 0);
  return remainingBusIds.length === x;
}


const label = 'something';
console.time(label);
for (let i = 1; true; i++) {
  const x = maxBusID * i;
  if (x % 100000000 === 0) {
    console.log(x);
  }
  if (checkBusIds(x, maxBusIndex)) {
    console.log(x - maxBusIndex, i, x)
    break;
  }
}
console.timeEnd(label);







// const isSomething = (t) => {
//   const start = t % busIDs[0].id === 0;
//   const end = (t + busIDs[busIDs.length - 1].index) % busIDs[busIDs.length - 1].id === 0
//   if (!start && !end) {
//     return false;
//   }

//   const x = busIDs.reduce((acc, bus) => {
//     if ((t + bus.index) % bus.id === 0) {
//       acc++
//     }
//     return acc;
//   }, 0);
//   return busIDs.length === x;
// }

// const label = 'something';
// console.time(label);
// const m = busIDs[0].id;
// for (let i = 1; true; i++) {
//   const x = m * i;
//   if (x % 1000000000 === 0) {
//     console.log(x);
//   }
//   if (isSomething(x)) {
//     console.log(x, m, i)
//     break;
//   }
// }
// console.timeEnd(label);