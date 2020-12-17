const fs = require('fs');
const [rules, myTicket, nearbyTickets] = fs.readFileSync('./input.txt', { encoding: 'utf-8' }).trim().split('\n\n');

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

const invalidNumCache = {};

for (const nearbyTicket of myNearbyTickets) {
  for (const ticketNum of nearbyTicket) {
    // check cache.
    const res = invalidNumCache[ticketNum];
    if (res) {
      invalidNumCache[ticketNum]++;
      continue;
    }

    if (checkFields(ticketNum) === 0) {
      invalidNumCache[ticketNum] = 1;
    }
  }
}

console.log(Object.entries(invalidNumCache).reduce((acc, [key, value]) => acc+(Number(key)*value), 0));