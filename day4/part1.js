const fs = require('fs');

const data = fs.readFileSync('./input.txt', { encoding: 'utf-8' })

const passports = data.split('\n').reduce((acc, p) => {
  const n = acc.length - 1;

  if (n < 0) {
    return [p];
  }

  if (p === '') {
    acc.push('');
  } else if(acc[n] === '' ){
    acc[n] = p;
  } else {
    acc[n] += ` ${p}`
  }

  return acc;
}, [])

const validatePassport = (passport) => {
  const requiredFields = new Set(['byr','ecl','eyr','hcl','hgt','iyr','pid'])

  passport.split(' ').forEach(keyValuePair => requiredFields.delete(keyValuePair.split(':')[0]));

  return requiredFields.size === 0
}

let validPassports = 0;

for (const passport of passports) {
  if (validatePassport(passport)) validPassports++;
}
console.log(validPassports);