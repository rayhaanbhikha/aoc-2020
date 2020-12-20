const fs = require('fs');
const { testMessage } = require('./reg')
const [dRules, dMessages] = fs.readFileSync('./input-example4.txt', { encoding: 'utf-8' }).trim().split('\n\n');

const rules = dRules.split('\n');
const messages = dMessages.split('\n');

const rulesingleCharRegEx = new RegExp(/\"(\w){1}\"$/, 's')
const ruleNormalRegEx = new RegExp(/(\d)+/, 's');
const rulePipeRegEx = new RegExp(/\|/, 's');

class Rule{
  constructor(num, rule) {
    this.num = num;
    this.rule = rule;
    this.originalRule = rule;
    if (rulesingleCharRegEx.test(rule)) {
      this.rule = rule.replace(/(\"|\ )/g, '');
    } else {
      this.nestedRules = Array.from(new Set(this.rule.replace(/(\D)/g, ' ').split(' ').filter(x => x !== '')));
    }
  }

  get isComplete() {
    return !ruleNormalRegEx.test(this.rule);
  }

  update(rule) {
    const aReg = new RegExp(`(?<!\\d)(${rule.num}){1}(?!\\d)`, 'g')
    if (aReg.test(this.rule)) {

      this.rule = this.rule.replace(aReg, rule.rule);
      if (this.isComplete) {
        if (this.rule.includes('|')) {
          this.rule = `(${this.rule.replace(/(\ )/g, '')})`
        }
        if (this.num === '0') {
          this.rule = `^${this.rule}$`;
        }
      }
    }
  }
}

const rulesWeKnow = new Map();

const ruleMap = rules.reduce((acc, rule) => {
  const [num, ruleValue] = rule.split(':');
  const newRule = new Rule(num, ruleValue.trim());
  if (newRule.rule.includes('a') || newRule.rule.includes('b')) {
    rulesWeKnow.set(num, newRule);
  } else {
    acc[num] = newRule;
  }
  return acc;
}, {});

compute(ruleMap, rulesWeKnow);

const rule42 = rulesWeKnow.get('42').rule;
const rule31 = rulesWeKnow.get('31').rule;

const baseRegex = new RegExp(`^${rule42}+${rule31}{1,}$`, 'gm');

let sum = messages.reduce((acc, m, index) => {
  const res = testMessage(m, baseRegex, rule42, rule31);
  // console.log(index, m, res);
  return res ? acc + 1 : acc
}, 0);

console.log(sum);


function compute(ruleMap, rulesWeKnow) {
  do {
    for (const ruleWeDontKnow in ruleMap) {
      if (Object.hasOwnProperty.call(ruleMap, ruleWeDontKnow)) {
        const rule = ruleMap[ruleWeDontKnow];
        const nestedRules = rule.nestedRules;
        nestedRules.forEach(nestedRule => {
          if (rulesWeKnow.has(nestedRule)) {
            const ruleWeKnow = rulesWeKnow.get(nestedRule);
            rule.update(ruleWeKnow)
          }
        })
        if (rule.isComplete) {
          rulesWeKnow.set(rule.num, rule);
          if (rule.num !== '0') {
            delete ruleMap[ruleWeDontKnow]
          }
        }
      }
    }
    // console.log(ruleMap)
  } while (Object.keys(ruleMap).length !== 1 && ruleMap[0]);
}