const fs = require('fs');
const { testMessage } = require('./reg')
const [dRules, dMessages] = fs.readFileSync('./input.txt', { encoding: 'utf-8' }).trim().split('\n\n');

const rules = dRules.split('\n');
const messages = dMessages.split('\n');

const rulesingleCharRegEx = new RegExp(/\"(\w){1}\"$/, 's')
const ruleNormalRegEx = new RegExp(/(\d)+/, 's');

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

// console.log(rule42)
// console.log(rule31)
// const rule42 = '((b((((a(ba|b)|ba[ba])b|(b(ab|b[ba])|ab{2})a)a|a(((ba|b)a|(a{2}|b{2})b)|b(b(ba|a{2})|aba))b)|a(b(a(ab{2}|ba[ba])|b(a(ab|b{2})|b([ba][ba])))|a(b(b{2}|a{2})a|b((ab|b)|a(a{2}|b{2}))b)))b|b(((((a{2}|b)b|a((b|)|ba)a)a|(b([ba][ba])|ab[ab])b)b|(ba((ba|a)|b{2}a)|ab((ab|b)|a{2}[ba]))a)|a((a((ab|a)|b([ba][ba]))b|(a((b|)|ba)b|a[ba]a)a)b|(b(b{3}|a{2}((b|)|ba))|a{2}((a(b|)|ba)))a))a)a|b((a(b(b((a{2}|b)b|(ab|b[ba])a)|a((ba|ab)a|(ab|b{2})b))|a(a((b{2}|a[ba])b|([ba][ba])a)|b{2}a{2}))|b((a((ba|b))a|a((a(b|)|ba)|b(b{2}|a[ba]))b)a|(a(b{2}a|a(ab|b{2}))|b((b{2}|a[ba])a|(ba|ab)b))b))|a{2}((a(b((a(b|)|ba)a|ab{2})|a(a(ab|b{2})|b([ba][ba])))|b(b(a(b{2}|a[ba])|b(ab|b{2}))|a(b(ba|ab)|a{2}b)))|b(b(ab{3}|b{2}((ab|b)|a{2}[ba]))|a(a(b[ab]a|bab)|b(a{2}b|b(ab|b{2}))))))b)'
// const rule31 = '(b(((b(ba((ba|a)|ba((b|)|ba))|a(a{3}|b{2}[ab]))|a((b(ba|a{2})|aba)a|(bab|ab[ab])b))a|((a(b{2}a|ab[ab])|b((ba|ab)a|(ab|b{2})b))b|(b(b{2}a|a{2}((b|)|ba))|a(a(ab|b[ba])|b(b{2}|a[ba])))a)b)b|(((b(a(b{2}|a[ba])|b(ab|b{2}))|a(b(ba|ab)|a(a{2}|b{2})))b|((a{2}b|a((b|)|ba)a)a|((a{2}|b{2})[ba])b)a)b|(a((b{2}a|a(ab|b{2}))b|(b(ba|a{2})|ab[ab])a)|ba((b(ba|b)|aba)|b(b{2}a|a{2}((b|)|ba))))a)a)|ab((((((ba|b)a|(ba|ab)b)a|(a{3}|b(ba|a{2}))b)a|(b(a[ba]a)|a{2}((a(b|)|ba)|b{2}[ab]))b)a|(ba((((b|)[ba])a|a((b|)|ba)b)|b(b(ba|a{2})|ab[ab]))|a(a((ab|a)|b([ba][ba]))a|(a((b|)|ba)b|a{3})b))b)|a(b(((ba[ba]|a(ba|ab))b|(([ba][ba])a|(ab|b{2})b)a)a|(b(b(ba|a{2})|aba)|a((ab|b{2})b|a((b|)|ba)a))b)|a(a((a{2}b|b(ab|b{2}))a|(a[ba]a)b)|b(a(b{2}a|ab[ab])|b(a[ba]a|(ab|b[ba])b))))))'
const baseRegex = new RegExp(`^(?<rule42>${rule42}+)(?<rule31>${rule31}+)$`, 's');

console.log(baseRegex);
let sum = messages.reduce((acc, m, index) => {
  const res = testMessage(m, baseRegex, rule31, rule42);
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