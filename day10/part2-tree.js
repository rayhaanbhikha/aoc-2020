const fs = require('fs');
const jolts = fs.readFileSync('./input-example2.txt', { encoding: 'utf8' }).trim().split('\n').map(n => Number(n)).sort((a, b) => a - b);

const lastJolt = jolts[jolts.length - 1];
jolts.push(lastJolt + 3);

// console.log(jolts);

class Node {
  constructor(value, parent) {
    this.parent = parent;
    this.value = value;
    this.children = [];
  }

  add(newValue) {
    const diff = newValue - this.value;
    if (diff <= 3 && diff !== 0) {
      if (!this.children.find(child => child.value === newValue)) {
        this.children.push(new Node(newValue, this));
      }
      this.children.forEach(child => {
        const diff = newValue - child.value;
        if (diff <= 3 && diff !== 0) {
          child.children.push(new Node(newValue, child));
        }
      });
    }
    this.children.forEach(child => child.add(newValue));
  }

  getNode(value) {
    if (this.value === value) {
      return this;
    }

    if (this.children.length > 0) {
      return this.children.find(child => child.value === value)
    }
  }

  print() {
    console.log("\n=====")
    console.log("parent: ", this.parent && this.parent.value);
    console.log("current: ", this.value);
    console.log("children: ")
    this.children.forEach(child => console.log(child.value));
    this.children.forEach(child => child.print());
  }
}

const rootNode = new Node(0, null);

// let currentNode = rootNode;

// rootNode.add(1);
// rootNode.add(4);
// rootNode.add(5);
// rootNode.add(6);
// rootNode.add(7);
// // rootNode.add(new Node(10));


// JSON.stringify(rootNode.print(), null, 2);

// console.log()
for (let i = 0; i < jolts.length; i++) {
  rootNode.add(jolts[i]);
  // console.log(i, jolts.length);
}

const queue = [rootNode];
const reachedTarget = lastJolt;
let reachedTargetNTimes = 0;
do {
  const currentNode = queue.shift();
  if (currentNode.value === reachedTarget) {
    reachedTargetNTimes++;
  }
  queue.unshift(...currentNode.children);
} while (queue.length !== 0);

console.log(reachedTargetNTimes)

// let currentJolt = 0;
// for (const jolt of jolts) {
//   const diff = jolt - currentJolt;
//   differences[diff] = differences[diff] ? differences[diff] + 1 : 1;
//   currentJolt = jolt;
// }

// console.log(differences['1'] * differences['3']);

