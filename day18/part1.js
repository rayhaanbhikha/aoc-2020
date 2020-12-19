const fs = require('fs');
const nums = fs.readFileSync('./input.txt', { encoding: 'utf-8' }).trim().split('\n');

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
      items.unshift(poppedItem);
      if (this.data.length === 0) break;
    } while (true);
    return items;
  }

  popAllUntil(item) {
    const items = [];
    do {
      if (this.peek() === item) break;
      items.unshift(this.data.pop());
      if (this.data.length === 0) break;
    } while (true);
    return items;
  }
}

const compute = (x, y, op) => {
  switch (op) {
    case '+':
      return x + y;
    case '*':
      return x * y;
  }
}

console.log(nums.reduce((acc, numLine) => acc+evaluateLine(numLine), 0))

function evaluateLine(numLine) {
  const input = Array.from(numLine.replace(/\ /g, ''));
  const operandStack = new Stack();
  const postfixNotationStack = new Stack();
  for (const op of input) {
    const num = Number(op);
    if (!operands.has(op)) {
      postfixNotationStack.add(num);
    } else {
  
      if (op === ')') {
        const opsPopped = operandStack.popAll('(')
        // opsPopped.forEach(op => postfixNotationStack.add(op));
        opsPopped.forEach(op => {
          const x = postfixNotationStack.pop();
          const y = postfixNotationStack.pop();
          postfixNotationStack.add(compute(x, y, op))
        });
      } else if (op === '(') {
        operandStack.add(op)
      } else {
        const prevOp = operandStack.peek();
        if (prevOp && prevOp !== '(') {
          const opsPopped = operandStack.popAllUntil('(')
          // console.log(op)
          // opsPopped.forEach(op => postfixNotationStack.add(op));
          opsPopped.forEach(op => {
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

  return postfixNotationStack.data[0]
}
