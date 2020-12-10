const fs = require('fs');
const jolts = fs.readFileSync('./input.txt', { encoding: 'utf8' }).trim().split('\n').map(n => Number(n)).sort((a, b) => a - b);

const lastJolt = jolts[jolts.length - 1]+3;
jolts.push(lastJolt);

const nodeCache = {};

const getFromCache = newValue => {
  if (nodeCache[newValue]) {
    return nodeCache[newValue];
  } else {
    const node = new Node(newValue);
    nodeCache[newValue] = node;
    return node;
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.children = [];
  }

  add(newValue) {
    const diff = newValue - this.value;
    if (diff <= 3) {
      this.children.push(getFromCache(newValue));
      return true;
    } else {
      for (const child of this.children) {
        if (child.add(newValue)) {
          break;
        }
      }
    }
  }
}

const rootNode = new Node(0);

for (let i = 0; i < jolts.length; i++) {
  const jolt = jolts[i];
  rootNode.add(jolt);
}

console.log(nodeCache);

const emptyNodes = Object.entries(nodeCache).filter(([key, node]) => node.children.length === 0 && node.value !== lastJolt).map(n => Number(n[0])).sort((a, b) => b - a);

console.log(emptyNodes);

for (const emptyNodeValue of emptyNodes) {
  const node = getFromCache(emptyNodeValue);
    const node1 = nodeCache[emptyNodeValue + 1];
    const node2 = nodeCache[emptyNodeValue + 2];
    const node3 = nodeCache[emptyNodeValue + 3];

  if (node1) {
    node.children.push(node1)
  }
  if (node2) {
    node.children.push(node2)
  }
  if (node3) {
    node.children.push(node3)
  }
}

console.log(nodeCache);

const queue = [rootNode];
do {
  if(queue.length === 0) {queue.push(rootNode)}
  const currentNode = queue.shift();

  console.log(currentNode.value);

  if (currentNode.children.length === 0) {
    // console.log("empty");
    emptyFound = true;

  } else {
    queue.push(...currentNode.children);
  }

} while (queue.length );

console.log(nodeCache)