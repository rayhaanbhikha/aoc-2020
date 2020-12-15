const fs = require('fs');
const { Node, walkNodes } = require('./node');

const getMemAddresses = (binaryAddressWithMaskBit) => {
  const rootNode = new Node(null, null);
  for (const bit of binaryAddressWithMaskBit) {
    rootNode.add(bit);
  }
  return walkNodes(rootNode).map(memAddress => BigInt(parseInt(memAddress, 2)))
}

class MaskBit{
  constructor(maskbit) {
    this.maskBit = maskbit;
  }

  getMemoryAddresses(memoryAddress) {
    const indexes = []
    const binaryString = this.maskBit.split('').map((bit, index) => {
      if (bit === 'X') indexes.push(index);
        return bit === 'X' ? '0' : bit
    }).join('');
    const standardBitMask = BigInt(parseInt(binaryString, 2));
    const newNumber = (memoryAddress | standardBitMask).toString(2);
    const newBinaryString = [...Array(36 - newNumber.length).fill(0), ...newNumber];
    indexes.forEach(index => {
      newBinaryString[index] = 'X';
    });
    const memAddresses = getMemAddresses(newBinaryString.join(''))
    return memAddresses;
  }
}

const program = fs.readFileSync('./input.txt', { encoding: 'utf-8' }).trim().split('\n');

const memReg = new RegExp(/^mem\[([0-9].*)\]\ =\ ([0-9].*)$/, 's');

let currentMaskBit;
const mem = [];
let sum = BigInt(0);
for (const instruction of program) {

  if (instruction.substring(0, 4) === 'mask') {
    currentMaskBit = new MaskBit(instruction.substring(7));
  } else {
    const res = memReg.exec(instruction);
    const loc = BigInt(res[1]);
    const val = BigInt(res[2]);
    const memAddresses = currentMaskBit.getMemoryAddresses(loc);
    for (const memAddress of memAddresses) {
      const newVal = mem[memAddress]
      if (newVal) sum -= newVal;
      mem[memAddress] = val;
      sum += val;
    }
  }
}
console.log(sum);





