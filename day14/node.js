class Node {
  constructor(parent, value) {
    this.parent = parent;
    this.value = value;
    this.isFloating = false;
    this.child = null;
    this.floatingChild = null;
    this.isFull = false;
    if (this.parent && this.parent.binValue) {
      this.binValue = this.parent.binValue + this.value;
    } else {
      this.binValue = this.value;
    }
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
    // console.log("bin: ", this.binValue)
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

function walkNodes(rootNode) {
  // walk through nodes;
  const nqueue = [rootNode];
  const nums = [];
  do {
    const currentNode = nqueue.shift();
    if (currentNode.child) {
      nqueue.unshift(currentNode.child);
    }
    if (currentNode.isFloating) {
      nqueue.unshift(currentNode.floatingChild);
    }
  
    if (!currentNode.child) {
      nums.push(currentNode.binValue);
    }
  
  } while (nqueue.length !== 0);
  return nums;
}

module.exports = {
  Node,
  walkNodes
}