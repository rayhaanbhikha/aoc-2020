class Stack {
  constructor() {
    this.data = [];
  }

  add(item) {
    this.data.push(item)
  }

  pop() {
    return this.data.pop();
  }

  peek() {
    return this.data[this.data.length - 1]
  }

  popAll(item) {
    const items = [];
    do {
      const poppedItem = this.data.pop()
      if (poppedItem === item) break;
      items.push(poppedItem);
      if (this.data.length === 0) break;
    } while (true);
    return items;
  }

  popAllUntil(item) {
    const items = [];
    do {
      if (this.peek() === item) break;
      items.push(this.data.pop());
      if (this.data.length === 0) break;
    } while (true);
    return items;
  }
}

module.exports = Stack;