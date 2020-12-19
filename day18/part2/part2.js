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

function evaluateLine(numLine) {
  const input = Array.from(numLine.replace(/\ /g, ''));
  const operandStack = new Stack();
  const postfixNotationStack = new Stack();

  const addToStack = (opsPopped) => opsPopped.forEach(op => {
      const x = postfixNotationStack.pop();
      const y = postfixNotationStack.pop();
      postfixNotationStack.add(compute(x, y, op))
    });

  for (const op of input) {
    const num = Number(op);
    
    if (!operands.has(op)) {
      postfixNotationStack.add(num);
      continue;
    }

    const prevOp = operandStack.peek();

    if (op === ')') {
      const opsPopped = operandStack.popAll('(')
      addToStack(opsPopped);
    } else if (op === '(' || op === '+' && prevOp === '*' || op === prevOp) {
      operandStack.add(op)
    } else {
      if (prevOp !== '(') {
        const opsPopped = operandStack.popAllUntil('(')
        addToStack(opsPopped);
      }
      operandStack.add(op);
    }
  }

  const remainingOps = operandStack.popAll()
  addToStack(remainingOps);

  return postfixNotationStack.data[0]
}
