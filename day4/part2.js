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

const yearValidation = (value, from, until) => value.length == 4 && value >= from && value <= until;

const hclColorRegex = new RegExp(/^#([0-9a-f]{6})$/)
const eyeColorRegex = new RegExp(/^(amb|blu|brn|gry|grn|hzl|oth){1}/)
const hgtRegex = new RegExp(/(in|cm)$/);

const validateHeight = (value) => {
  const [height, unitOfMeasurement] = value.split(hgtRegex)
  if (!unitOfMeasurement) return false;

  switch (unitOfMeasurement.toLowerCase()) {
    case 'cm':
      return height >= 150 && height <= 193;
    case 'in':
      return height >= 59 && height <= 76;
    default:
      return false
  }
}

const validatePid = (value) => value.length === 9 && Number(value) !== NaN

const validatePassport = (passport) => {
  const requiredFields = new Set(['byr','ecl','eyr','hcl','hgt','iyr','pid'])

  passport.split(' ').forEach(keyValuePair => {
    const [key, value] = keyValuePair.split(':');
    switch (key) {
      case 'byr':
        if (yearValidation(value, 1920, 2002)) requiredFields.delete(key);
        break;
      case 'iyr':
        if (yearValidation(value, 2010, 2020)) requiredFields.delete(key);
        break;
      case 'eyr':
        if (yearValidation(value, 2020, 2030)) requiredFields.delete(key);
        break;
      case 'hgt':
        if (validateHeight(value)) requiredFields.delete(key);
        break;
      case 'hcl':
        if (hclColorRegex.test(value)) requiredFields.delete(key);
        break;
      case 'ecl':
        if (value.length === 3 && eyeColorRegex.test(value)) requiredFields.delete(key);
        break;
      case 'pid':
        if (validatePid(value)) requiredFields.delete(key);
        break;
    }
  });

  return requiredFields.size === 0;
}

let validPassports = 0;

for (const passport of passports) {
  if (validatePassport(passport)) validPassports++;
}
console.log(validPassports);