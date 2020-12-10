const fs = require('fs');
const jolts = fs.readFileSync('./input.txt', { encoding: 'utf8' }).trim().split('\n').map(n => Number(n)).sort((a, b) => a - b);
console.time("START");
const lastJolt = jolts[jolts.length - 1]+3;
jolts.push(lastJolt);

const nodeCache = {};

class Node {
  constructor(value, parent) {
    this.value = value;
    this.parent = parent;
    this.children = [];
    this.weight = 0;
  }

  add(newValue) {
    const diff = newValue - this.value;
    if (diff <= 3) {
      let node;
      if (nodeCache[newValue]) {
        node = nodeCache[newValue];
      } else {
        node = new Node(newValue, this);
        nodeCache[newValue] = node;
      }
      this.children.push(node);
      return true;
    } else {
      for (const child of this.children) {
        if (child.add(newValue)) {
          break;
        }
      }
    }
  }

  updateWeight() {
    this.weight = this.children.reduce((acc, child) => {
      if (child.weight === 0) {
        acc++;
      } else {
        acc += child.weight;
      }
      return acc;
    }, 0);
    if (this.parent) {
      this.parent.updateWeight();
    }
  }

  addNode(newNode) {
    if (!this.children.includes(newNode)) {
      this.children.push(newNode);
    }
  }

  print() {
    console.log(this.value)
    console.log("children: ")
    this.children.forEach(c => console.log(c.value));
    console.log("=================\n")
    this.children.forEach(c => c.print());
  }
}

const rootNode = new Node(0);
nodeCache['0'] = rootNode;

for (let i = 0; i < jolts.length; i++) {
  const jolt = jolts[i];
  rootNode.add(jolt);
}

nodeCache[lastJolt].updateWeight();

const emptyNodes = Object.entries(nodeCache).filter(([key, node]) => node.children.length < 3 && node.value !== lastJolt).map(n => Number(n[0])).sort((a, b) => b - a);

for (const emptyNodeValue of emptyNodes) {
  const node = nodeCache[emptyNodeValue];
  const node1 = nodeCache[emptyNodeValue + 1];
  const node2 = nodeCache[emptyNodeValue + 2];
  const node3 = nodeCache[emptyNodeValue + 3];

  if (node1) {
    node.addNode(node1)
  }
  if (node2) {
    node.addNode(node2)
  }
  if (node3) {
    node.addNode(node3)
  }
  node.updateWeight();
}

console.log(nodeCache['0'].weight);

console.timeEnd("START")