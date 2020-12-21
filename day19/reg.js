function testMessage(message, baseRegex, rule31, rule42) {
  // rule31
  const res = baseRegex.exec(message);
  if (!res) {
    return false;
  }
  const stringsMatchingRule31 = res.groups.rule31;
  
  const plainRule31Regex = new RegExp(rule31, 'gm');
  const numOfTimesRule31Matches = computeGroupMatches(stringsMatchingRule31, plainRule31Regex);
  
  // rule42
  const stringsMatchingRule42 = res.groups.rule42;
  
  const plainRule42Regex = new RegExp(rule42, 'gm');
  const numOfTimesRule42Matches = computeGroupMatches(stringsMatchingRule42, plainRule42Regex);
  
  if (numOfTimesRule42Matches < numOfTimesRule31Matches) {
    return false;
  }
  
  const rule31Group = `(?<rule31>${rule31}{${numOfTimesRule31Matches}})`;
  const rule42Group1 = `(?<rule42part1>${rule42}+)`
  const rule42Group2 = `(?<rule42part2>${rule42}{${numOfTimesRule31Matches}})`
  const actualRegex =  new RegExp(`^${rule42Group1}${rule42Group2}${rule31Group}$`, 's');
  return actualRegex.test(message);
}


function computeGroupMatches(message, regex) {
  let m;
  let matches = 0;
  while ((m = regex.exec(message)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
          regex.lastIndex++;
      }
      
      // The result can be accessed through the `m`-variable.
    // console.log("hello: ", m)
    matches++
    // m.forEach((match, groupIndex) => {
    //   if (match) {
    //     matches++
    //   }
    // });
    // console.log(matches)
  }
  return matches;
}

module.exports = {
  testMessage
}