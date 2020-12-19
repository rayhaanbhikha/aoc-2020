const fs = require('fs');
const Stack = require('./stack');

const nums = fs.readFileSync('../input.txt', { encoding: 'utf-8' }).trim().split('\n');

const operands = new Set(['+', '*', '(', ')']);

const compute = (x, y, op) => {
  switch (op) {
    case '+':
      return x + y;
    case '*':
      return x * y;
  }
}

console.log(nums.reduce((acc, numLine) => acc+evaluateLine(numLine), 0))

// const nums = '2 * 3 + (4 * 5)';
// const nums = '5 + (8 * 3 + 9 + 3 * 4 * 3)'
// const nums = '5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))'
// console.log(evaluateLine(nums))

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
        if (op === '+' && prevOp === '*' || op === prevOp) {
          operandStack.add(op);
          continue;
        }
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
  // const opsPopped = operandStack.popAllUntil('(')
  // opsPopped.forEach(op => postfixNotationStack.add(op));
  operandStack.popAll().forEach(op => {
      const x = postfixNotationStack.pop();
      const y = postfixNotationStack.pop();
      postfixNotationStack.add(compute(x, y, op))
    });
    console.log(postfixNotationStack.data, operandStack.data)

  return postfixNotationStack.data[0]
}
