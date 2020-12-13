const fs = require('fs');
const busIDsInput =
  fs.readFileSync('./input-example.txt', { encoding: 'utf8' })
    .trim()
    .split('\n')[1]
    .split(',');

// const busIDsInput = [17, 'x', 13, 19]
// const busIDsInput = [67,7,59,61]
// const busIDsInput = [67,'x',7,59,61]
// const busIDsInput = [67,7,'x',59,61]
// const busIDsInput = [1789,37,47,1889]

const busIDs = busIDsInput.reduce((busIDs, busID, index) => {
  if (busID === 'x') return busIDs;
  return [...busIDs, { m: Number(busID), r: busIDsInput.length - 1 - index }]
}, [])

console.log(busIDs)

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

const getTime = busIDs => {
  const N = busIDs.reduce((acc, busID) => acc * busID.m, 1);
  let sum = 0
  for (const busID of busIDs) {
    const ni = N / busID.m;
    const xi = modInverse(ni, busID.m);
    sum += busID.r * xi * ni;
  }
  sum %= N;
  return sum - busIDs[0].r
}


const answer = getTime(busIDs);

console.log("ANSWER: ", answer);
busIDsInput.forEach((busID, index) => {
  if (busID === 'x') {
    console.log(busID);
  } else {
    console.log(Number(busID), answer+index, (answer+index) % Number(busID))
  }
})


