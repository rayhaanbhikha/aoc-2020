const fs = require('fs');
const path = require('path');

const day = process.argv[2];

const directory = path.join(__dirname, `./day${day}`);

fs.mkdirSync(directory);

const files = [
  'part1.js',
  'part2.js',
  'input.txt',
  'input-example.txt'
]

for (const fileName of files) {
  fs.writeFileSync(path.join(directory, fileName), '');
}
