const nums = '2 * 3 + ( 4 * 5 )';
// const nums = '1 + ( 2 * 3 ) + ( 4 * ( 5 + 6 ) )'
// const nums = '1 + 2 * 3 + 4 * 5 + 6';
const input = nums.split('\ ');
console.log(input);

const postfixNotation = [];
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


for (const op of input) {
  const num = Number(op);
  if (!operands.has(op)) {
    postfixNotation.push(num);
  } else {

    if (op === ')') {
      postfixNotation.push(...operandStack.popAll('('));
    } else if (op === '(') {
      operandStack.add(op)
    } else {
      const prevOp = operandStack.peek();
      if (prevOp !== '(') {
        postfixNotation.push(...operandStack.popAll())
        operandStack.add(op);
      } else {
        operandStack.add(op);
      }
    }
  }
}

console.log(postfixNotation, operandStack);
