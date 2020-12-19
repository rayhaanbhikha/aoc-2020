const fs = require('fs');
const [dRules, dMessages] = fs.readFileSync('./input.txt', { encoding: 'utf-8' }).trim().split('\n\n');

const rules = dRules.split('\n');
const messages = dMessages.split('\n');

console.log(rules);
console.log(messages);

const rulesingleCharRegEx = new RegExp(/^\"(\w){1}\"$/, 's')
const ruleNormalRegEx = new RegExp(/(\d)+/, 's');
const rulePipeRegEx = new RegExp(/\|/, 's');

class Rule{
  constructor(num, rule) {
    this.num = num;
    this.rule = rule;

    if (rulesingleCharRegEx.test(rule)) {
      this.rule = rule.replace(/\"/g, '');
    }
  }

  get isComplete() {
    return !ruleNormalRegEx.test(this.rule);
  }

  update(rule) {
    const aReg = new RegExp(`${rule.num}`, 'g')
    this.rule = this.rule.replace(aReg, rule.rule);
  }

  polish() {
    if (this.rule.includes('|')) {
      this.rule = `(${this.rule})`
    }
    if (this.num === '0' && this.isComplete) {
      this.rule = `^${this.rule}$`;
    }
  }
}

const rulesWeKnow = [];

const ruleMap = rules.reduce((acc, rule) => {
  const [num, ruleValue] = rule.replace(/\ /g, '').split(':');
  const newRule = new Rule(num, ruleValue);
  if (newRule.rule === 'a' || newRule.rule === 'b') {
    rulesWeKnow.push(newRule);
  } else {
    acc[num] = newRule;
  }
  return acc;
}, {});


// console.log(rulesWeKnow);
// console.log(ruleMap, ruleMap[0].isComplete);

do {
  for (const ruleWeDontKnow in ruleMap) {
    if (Object.hasOwnProperty.call(ruleMap, ruleWeDontKnow)) {
      const rule = ruleMap[ruleWeDontKnow];
      rulesWeKnow.forEach(r => {
        rule.update(r);
      })
      rule.bracket();
      if (rule.isComplete) {
        rulesWeKnow.push(rule);
        if (rule.num !== '0') {
          delete ruleMap[ruleWeDontKnow]
        }
      }
    }
  }
  // console.log(rulesWeKnow)
} while (!ruleMap[0].isComplete);



// ruleMap[2].update(aRule);
// ruleMap[2].update(bRule);
// ruleMap[2].bracket();

// console.log(ruleMap);
// console.log(ruleMap[0].isComplete);

// ruleMap[0].update(aRule)
// ruleMap[0].update(ruleMap[2])
// console.log(ruleMap);
// console.log(rulesWeKnow)
const rule0 = new RegExp(rulesWeKnow.find(rule => rule.num === '0').rule);
console.log(rule0);

let sum = 0;
messages.forEach(message => {
  if (rule0.test(message)) {
    sum++;
  }
})
console.log(sum);


// const rulesWeKnow = Object.entries(rulesMap).filter(([ruleNumber, rule]) => rule.value);

// rulesWeKnow.forEach(([ruleNum, rule]) => {

//   console.log(ruleNum, rule);
// })

// console.log(nestedRulesRegEx.exec('12'))
// console.log(nestedRulesRegEx.exec('13|31'))
// // console.log(rulesWeKnow);
