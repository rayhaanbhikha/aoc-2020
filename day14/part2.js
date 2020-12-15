const fs = require('fs');
const program = fs.readFileSync('./input.txt', { encoding: 'utf-8' }).trim().split('\n');

const memReg = new RegExp(/^mem\[([0-9].*)\]\ =\ ([0-9].*)$/, 's');



class MaskBit{
  constructor(maskbit) {
    this.maskBit = maskbit;
  }

  computeBitMask(number) {
    const indexes = []
    const binaryString = this.maskBit.split('').map((bit, index) => {
      if (bit === 'X') indexes.push(index);
        return bit === 'X' ? '0' : bit
    }).join('');
    const standardBitMask = BigInt(parseInt(binaryString, 2));

    const newNumber = number | standardBitMask

    console.log(newNumber, newNumber.toString(2));
    console.log(indexes);

    const actualBinary = [...new Array(36 - newNumber.toString(2).length).fill(0), ...newNumber.toString(2).split('')];
    let maxIndex = 0;
    indexes.forEach(index => {
      actualBinary[index] = 'X';
    })
    const newNumWithXs = actualBinary.join('');
    // console.log("Z: ", )
    indexes.forEach(index => {
      console.log(binaryNumberSomething(index, newNumWithXs));
    })
    // indexes.f

    return ;
  }
}


// X1101X

const binNum = '0X1101X'

class Node {
  constructor(parent, value) {
    this.parent = parent;
    this.value = value;
    this.isFloating = false;
    this.child = null;
    this.floatingChild = null;
    this.isFull = false;
  }

  add(bit) {

    if (this.isFull) {
      this.child.add(bit);
      // is full and floating.
      if (this.isFloating) this.floatingChild.add(bit);
      return;
    }

    if (bit === 'X') {
      this.child = new Node(this, '1');
      this.floatingChild = new Node(this, '0');
      this.isFloating = true;
      this.isFull = true;
    } else {
      this.child = new Node(this, bit);
      this.isFull = true;
    }
  }

  print() {
    console.log("\n--------")
    console.log("val: ", this.value)
    console.log("children: ")
    if (this.isFloating) {
      console.log("floating: ", this.floatingChild.value);
      this.floatingChild.print()
      // this.child.print();
    } else {
      if (this.child) {
        console.log(this.child.value);
        this.child.print();
      }
    }
  }
}

const rootNode = new Node(null, null);

for (const bit of binNum) {
  rootNode.add(bit);
}

rootNode.print();

// function walkNodes() {
//   // walk through nodes;
//   const nqueue = [rootNode];
//   const nums = [];
//   do {
//     const currentNode = nqueue.shift();
//     if (currentNode.child) {
//       nqueue.unshift(currentNode.child);
//     }
//     if (currentNode.isFloating) {
//       nqueue.unshift(currentNode.floatingChild);
//     }
  
//     if (!currentNode.child) {
//       nums.push(currentNode.binValue);
//     }
  
//   } while (nqueue.length !== 0);
//   console.log(nums);
// }

// // rootNode.print();
// addFloatingNodes();

// walkNodes();