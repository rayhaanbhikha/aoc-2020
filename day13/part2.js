// const fs = require('fs');
// // const busIDsInput =
// //   fs.readFileSync('./input-example.txt', { encoding: 'utf8' })
// //     .trim()
// //     .split('\n')[1]
// //     .split(',');

// // last number: 41419100000000
// // 7,13,x,x,59,x,31,19
// // const busIDsInput = [67,7,59,61]
// // const busIDsInput = [67,'x',7,59,61]
// // const busIDsInput = [67,7,'x',59,61]
// // const busIDsInput = [1789,37,47,1889]
// const busIDsInput = [7, 19]

// let maxBusID = 0;
// let maxBusIndex = 0;
// const busIDs = busIDsInput.reduce((busIDs, busID, index) => {
//   if (busID === 'x') return busIDs;
//   if (Number(busID) > maxBusID) {
//     maxBusID = Number(busID);
//     maxBusIndex = index;
//   }
//   return [...busIDs, { id: Number(busID), index }]
// }, [])

// const remainingBusIds = busIDs.filter(busID => busID.id !== maxBusID);

// // console.log(busIDsInput);
// console.log(remainingBusIds)
// console.log(maxBusID)
// console.log(maxBusIndex)

// const checkBusIds = (t, index) => {
//   const startTime = t - index;
//   const endTime = busIDsInput.length - 1 - index + t;
//   const end = (endTime) % busIDs[busIDs.length - 1].id === 0
//   if (!end) {
//     return false;
//   }

//   const x = remainingBusIds.reduce((acc, bus) => {
//     if ((startTime + bus.index) % bus.id === 0) {
//       acc++
//     }
//     return acc;
//   }, 0);
//   return remainingBusIds.length === x;
// }


// const label = 'something';
// console.time(label);
// for (let i = 1; true; i++) {
//   const x = maxBusID * i;
//   if (x % 100000000 === 0) {
//     console.log(x);
//   }
//   if (checkBusIds(x, maxBusIndex)) {
//     console.log(x - maxBusIndex, i, x)
//     break;
//   }
// }
// console.timeEnd(label);


// a = a % m; 
// for (int x = 1; x < m; x++) 
//     if ((a * x) % m == 1) 
//         return x; 
// return 1; 
console.log('\n--------')

//  ax = 1 (mod m)
function modInverse(a, m) {
  a = a % m;
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) {
      return x;
    }
  }
  return 1
}

// const busIDsInput = [17, 'x', 13, 19]
// const busIDsInput = [67,7,59,61]
// const busIDsInput = [67,'x',7,59,61]
// const busIDsInput = [67,7,'x',59,61]
const busIDsInput = [1789,37,47,1889]

const busIDs = busIDsInput.reduce((busIDs, busID, index) => {
  if (busID === 'x') return busIDs;
  return [...busIDs, { m: Number(busID), r: busIDsInput.length - 1 - index }]
}, [])

const getTime = busIDs => {
  const N = busIDs.reduce((acc, busID) => acc * busID.m, 1);
  console.log(busIDs, N);
  let sum = 0
  for (const busID of busIDs) {
    const ni = N / busID.m;
    const xi = modInverse(ni, busID.m);
    sum += busID.r * xi * ni;
  }
  sum %= N;
  console.log( sum - busIDs[0].r);
  return sum - busIDs[0].r
}

getTime(busIDs);

// const m1 = 19
// const m2 = 13
// const m3 = 17

// const r1 = 0;
// const r2 = 1;
// const r3 = 3;

// const N = m1 * m2 * m3;

// const n1 = N / m1;
// const n2 = N / m2;
// const n3 = N / m3;

// const x1 = modInverse(n1, m1);
// const x2 = modInverse(n2, m2);
// const x3 = modInverse(n3, m3);

// const sum = r1*x1*n1 + r2*x2*n2+ r3*x3*n3
// console.log(sum);
// console.log(sum % N);

// console.log(modInverse(221, 19))
// console.log(modInverse(493, 13))
// console.log(modInverse(377, 17))

// const x = 1 * 493 * 12 + 377 * 6 * 2
// console.log(x % (6409));

// console.log(modInverse(56, 1))
// console.log(modInverse(40, 7))
// console.log(modInverse(35, 8))