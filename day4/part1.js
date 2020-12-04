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
  const requiredFields = {
    'byr': 1,
    'ecl': 1,
    'eyr': 1,
    'hcl': 1,
    'hgt': 1,
    'iyr': 1,
    'pid': 1
  }

  passport.split(' ').forEach(keyValuePair => {
    const key = keyValuePair.split(':')[0];
    requiredFields[key] = 0;
  });

  for (const requiredField in requiredFields) {
    if (requiredFields[requiredField] !== 0) {
      return false;
    }
  }
  return true
}

let validPassports = 0;

for (const passport of passports) {
  if (validatePassport(passport)) validPassports++;
}
console.log(validPassports);