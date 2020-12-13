const fs = require('fs');
const busIDsInput =
  fs.readFileSync('./input.txt', { encoding: 'utf8' })
    .trim()
    .split('\n')[1]
    .split(',');

// last number: 41419100000000
// 7,13,x,x,59,x,31,19
// const busIDsInput = [1789,37,47,1889]
// const busIDsInput = [67,7,'x',59,61]
    
let maxBusID = 0;
let maxBusIndex = 0;
const busIDs = busIDsInput.reduce((busIDs, busID, index) => {
  if (busID === 'x') return busIDs;
  if (Number(busID) > maxBusID) {
    maxBusID = busID;
    maxBusIndex = index;
  }
  return [...busIDs, { id: Number(busID), index }]
}, [])

console.log(busIDsInput);
console.log(busIDs)
console.log(maxBusID)
console.log(maxBusIndex)

const isSomething = (t, index) => {
  // console.log(t - index);
  const startTime = t - index;
  const endTime = busIDsInput.length - 1 - index + t;
  const start = (startTime) % busIDs[0].id === 0;
  const end = (endTime) % busIDs[busIDs.length - 1].id === 0
  if (!start && !end) {
    return false;
  }

  const x = busIDs.reduce((acc, bus) => {
    if ((startTime + bus.index) % bus.id === 0) {
      acc++
    }
    return acc;
  }, 0);
  return busIDs.length === x;
}


const t = 1068781;

console.log(busIDs.reduce((acc, busId) => {
  console.log(busId.id);
  return acc * busId.id
}, 1))

// // console.log(Math.pow(t, 7))
// const label = 'something';
// console.time(label);
// for (let i = 1; true; i++) {
//   const x = Math.pow(busIDs[0].id, i);
//   console.log(x);
//   if (i > 56) {
//     break;
//   }
//   if (x % 100000000 === 0) {
//     console.log(x);
//   }
//   if (isSomething(x, 0)) {
//     console.log(x, i)
//     break;
//   }
// }
// console.timeEnd(label);







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