// const nums = '2 * 3 + ( 4 * 5 )';
// const nums = '1 + ( 2 * 3 ) + ( 4 * ( 5 + 6 ) )'
// const nums = '1 + 2 * 3 + 4 * 5 + 6';
const input = nums.split('\ ');
console.log(input);

// let operandStack = [];

const operands = new Set(['+', '*', '(', ')']);

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
}

const operandStack = new Stack();
const postfixNotationStack = new Stack();

const compute = (x, y, op) => {
  switch (op) {
    case '+':
      return x + y;
    case '*':
      return x * y;
  }
}

for (const op of input) {
  const num = Number(op);
  if (!operands.has(op)) {
    postfixNotationStack.add(num);
  } else {

    if (op === ')') {
      operandStack.popAll('(').forEach(op => {
        const x = postfixNotationStack.pop();
        const y = postfixNotationStack.pop();
        postfixNotationStack.add(compute(x, y, op))
      });
    } else if (op === '(') {
      operandStack.add(op)
    } else {
      const prevOp = operandStack.peek();
      if (prevOp !== '(') {
        operandStack.popAll().forEach(op => {
          const x = postfixNotationStack.pop();
          const y = postfixNotationStack.pop();
          postfixNotationStack.add(compute(x, y, op))
        });
      }
      operandStack.add(op);
    }
  }
}

operandStack.popAll().forEach(op => {
  const x = postfixNotationStack.pop();
  const y = postfixNotationStack.pop();
  postfixNotationStack.add(compute(x, y, op))
});

console.log(postfixNotationStack.data[0]);