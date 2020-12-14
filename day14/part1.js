const fs = require('fs');
const program = fs.readFileSync('./input.txt', { encoding: 'utf-8' }).trim().split('\n');

const memReg = new RegExp(/^mem\[([0-9].*)\]\ =\ ([0-9].*)$/, 's');

class MaskBit{
  constructor(maskbit) {
    this.maskBit = maskbit;
  }

  get inverseBitMask() {
    return BigInt(parseInt(this.maskBit.split('').map(bit => bit === 'X' || bit === '1' ? '0' : '1').join(''), 2));
  }

  get standardBitMask() {
    return BigInt(parseInt(this.maskBit.replace(/X/g, '0'), 2));
  }

  computeBitMask(number) {
    return ~this.inverseBitMask & number | this.standardBitMask;
  }
}

let currentMaskBit;
const mem = [];

for (const instruction of program) {

  if (instruction.substring(0, 4) === 'mask') {
    currentMaskBit = new MaskBit(instruction.substring(7));
  } else {
    const res = memReg.exec(instruction);
    const loc = BigInt(res[1]);
    const val = BigInt(res[2])
    console.log("hello: ", loc, val, currentMaskBit.computeBitMask(val))

    mem[loc] = currentMaskBit.computeBitMask(val);
  }
}


console.log(mem.reduce((acc, val) => acc+val, 0n));

