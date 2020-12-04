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

const yearValidation = (value, from, until) => value.length == 4 && Number(value) !== NaN && (Number(value) >= from && Number(value) <= until)

const hclColorRegex = new RegExp(/^#([0-9a-f]{6})$/)
const eyeColorRegex = new RegExp(/^(amb|blu|brn|gry|grn|hzl|oth){1}/)
const hgtRegex = new RegExp(/(in|cm)$/);

const validateHeight = (value) => {
  const [height, unitOfMeasurement] = value.split(hgtRegex)

  if (!unitOfMeasurement) return false;

  let h = Number(height);

  switch (unitOfMeasurement.toLowerCase()) {
    case 'cm':
      return h >= 150 && h <= 193;
    case 'in':
      return h >= 59 && h <= 76;
    default:
      return false
  }
}

const validatePid = (value) => {
  if (value.length !== 9 || Number(value) === NaN ) return false;
  return true
}

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
    const [key, value] = keyValuePair.split(':');
    switch (key) {
      case 'byr':
        if (yearValidation(value, 1920, 2002)) delete requiredFields[key];
        break;
      case 'iyr':
        if (yearValidation(value, 2010, 2020)) delete requiredFields[key];
        break;
      case 'eyr':
        if (yearValidation(value, 2020, 2030)) delete requiredFields[key];
        break;
      case 'hgt':
        if (validateHeight(value)) delete requiredFields[key];
        break;
      case 'hcl':
        if (hclColorRegex.test(value)) delete requiredFields[key];
        break;
      case 'ecl':
        if (value.length === 3 && eyeColorRegex.test(value)) delete requiredFields[key];
        break;
      case 'pid':
        if (validatePid(value)) delete requiredFields[key];
        break;
    }
  });

  return Object.keys(requiredFields).length === 0
}

let validPassports = 0;

for (const passport of passports) {
  if (validatePassport(passport)) validPassports++;
}
console.log(validPassports);