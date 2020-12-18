const fs = require('fs');
const [rules, ticket, nearbyTickets] = fs.readFileSync('./input.txt', { encoding: 'utf-8' }).trim().split('\n\n');

const fieldRegex = new RegExp(/^([\w\ ]+):\ (\d+)-(\d+)\ or\ (\d+)-(\d+)$/, 's');

class FieldRule {
  constructor(fieldRule) {
    const res = fieldRegex.exec(fieldRule);
    this.name = res[1];
    this.range1 = {
      min: Number(res[2]),
      max: Number(res[3]),
    };
    this.range2 = {
        min: Number(res[4]),
        max: Number(res[5]),
    }
  }

  isNumValid(number) {
    return (number >= this.range1.min && number <= this.range1.max) || (number >= this.range2.min && number <= this.range2.max)
  }
}

const fieldRules = rules.split('\n').map(fieldRule => (new FieldRule(fieldRule)));
const checkFields = number => {
  const num = Number(number);
  return fieldRules.reduce((result, fieldRule) => result += (fieldRule.isNumValid(num) ? 1 : 0), 0);
}
const myNearbyTickets = nearbyTickets.split('\n').slice(1).map(ticket => ticket.split(','));
const myTicket = ticket.split('\n').slice(1)[0].split(',');

const invalidNumCache = new Set();
const validNearByTickets = [];

for (const nearbyTicket of myNearbyTickets) {
  let isValidTicket = true;
  for (const ticketNum of nearbyTicket) {
    if (invalidNumCache.has(ticketNum)) {
      isValidTicket = false;
      continue;
    }

    if (checkFields(ticketNum) === 0) {
      isValidTicket = false;
      invalidNumCache.add(ticketNum);
    }
  }
  if (isValidTicket) validNearByTickets.push(nearbyTicket);
}


function checkAllIndexes(validTickets, index, fieldRule) {
  let successfulAssertions = 0;
  for (let i = 0; i < validTickets.length; i++) {
    const number = validTickets[i][index];
    if (fieldRule.isNumValid(number)) {
      successfulAssertions++
    }
  }
  return successfulAssertions === validTickets.length;
}

const indexesToUse = new Set(validNearByTickets.map((_, index) => index));
console.log(indexesToUse.has(0));
const actualData = {};

function someWork() {
  const fieldsAndPossibleIndexes = {};

  fieldRules.forEach(fieldRule => {
    for (let index = 0; index < validNearByTickets.length; index++) {
      if (!indexesToUse.has(index)) { continue; }
      if (checkAllIndexes(validNearByTickets, index, fieldRule)) {
        fieldsAndPossibleIndexes[fieldRule.name] =
          fieldsAndPossibleIndexes[fieldRule.name] ? [...fieldsAndPossibleIndexes[fieldRule.name], index] : [index];
      }
    }
  })

  Object.entries(fieldsAndPossibleIndexes).forEach(([ruleName, indexes]) => {
    if (indexes.length === 1) {
      actualData[ruleName] = indexes[0];
      indexesToUse.delete(indexes[0]);
    }
  })
}

// recursively match as one fieldRule will match one index somewhere and then work backwards.
do {
  someWork()
console.log(actualData);
} while (indexesToUse.size !== 0);

const indexes = [17, 2, 19, 8, 11, 14]

let sum = 1n;

indexes.forEach(index => {
  console.log(index, Number(myTicket[index]));
  sum *= BigInt(Number(myTicket[index]))

})

console.log(sum);