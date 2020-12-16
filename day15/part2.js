class Num {
  constructor(lastSpoken) {
    this.lastSpokenPlus1 = null;
    this.lastSpoken = lastSpoken;
    this.firstTimeSpoken = true;
  }

  update(newLastSpoken) {
    this.lastSpokenPlus1 = this.lastSpoken;
    this.lastSpoken = newLastSpoken;
    this.firstTimeSpoken = false;
  }

  diff() {
    return this.lastSpoken - this.lastSpokenPlus1
  }
}

// const numsSpoken = [0, 3, 6];
const numsSpoken = [20, 0, 1, 11, 6, 3];
console.log(numsSpoken);
const numbersSpoken = numsSpoken.reduce((acc, num, index) => ({...acc, [num]: new Num(index+1)}), {})

let lastNumSpoken = numsSpoken[numsSpoken.length - 1];

for (let i = numsSpoken.length + 1; i <= 30000000; i++) {
  if (i % 1_000_000 === 0) {
    console.log(i);
  }
  const numberWasSpoken = numbersSpoken[lastNumSpoken];
  if (numberWasSpoken) {
    if (numberWasSpoken.firstTimeSpoken) {
      const numberSpoken = 0;
      numbersSpoken[numberSpoken].update(i);
      lastNumSpoken = numberSpoken;
    } else {
      const numberSpoken = numberWasSpoken.diff();
      if (numbersSpoken[numberSpoken]) {
        numbersSpoken[numberSpoken].update(i);
      } else {
        numbersSpoken[numberSpoken] = new Num(i);
      }
      lastNumSpoken = numberSpoken;
    }
  }
}

console.log(lastNumSpoken);