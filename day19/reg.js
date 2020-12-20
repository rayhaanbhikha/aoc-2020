
// const rule42 = '((b(a(bb|ab)|b((a|b)(a|b)))|a(bbb|a(bb|a(a|b))))b|(((aa|ab)a|bbb)b|(((a|b)a|bb)a)a)a)'
// const rule30 = '(b(b(aba|baa)|a(b(ab|(a|b)a)|a(ba|ab)))|a(b((ab|(a|b)a)b|((a|b)a|bb)a)|a(bab|(ba|bb)a)))'
// const baseRegex = new RegExp(`^${rule42}+${rule30}{1,}$`, 'gm');

// // const val = 'bbabbbbaabaabba'
// // const message = 'aaaabbaaaabbaaa'
// const message = 'aaabbbbbbaaaabaababaabababbabaaabbababababaaa'

// const messages = [
//   'abbbbbabbbaaaababbaabbbbabababbbabbbbbbabaaaa',
//   'bbabbbbaabaabba',
//   'babbbbaabbbbbabbbbbbaabaaabaaa',
//   'aaabbbbbbaaaabaababaabababbabaaabbababababaaa',
//   'bbbbbbbaaaabbbbaaabbabaaa',
//   'bbbababbbbaaaaaaaabbababaaababaabab',
//   'ababaaaaaabaaab',
//   'ababaaaaabbbaba',
//   'baabbaaaabbaaaababbaababb',
//   'abbbbabbbbaaaababbbbbbaaaababb',
//   'aaaaabbaabaaaaababaa',
//   'aaaabbaaaabbaaa',
//   'aaaabbaabbaaaaaaabbbabbbaaabbaabaaa',
//   'babaaabbbaaabaababbaabababaaab',
//   'aabbbbbaabbbaaaaaabbbbbababaaaaabbaaabba',
// ]

// let sum = 0;
// messages.forEach((message, index) => {
//   // console.log(index+1, message)
//   if (testMessage(message, baseRegex)) {
//     sum++;
//   }
// })
// console.log(sum);

function testMessage(message, baseRegex, rule42, rule31) {
  const matches = computeGroupMatches(message, baseRegex);
  console.log(matches);
  if (matches < 1) {
    return false;
  }
  const rule0 = new RegExp(`^${rule42}+${rule31}{${matches}}$`);
  return rule0.test(message);
}

// const regex = /(ab|ba{1})a/gm;
// const str = `abbaa`;
function computeGroupMatches(message, regex) {
  let m;
  let matches = 0;
  while ((m = regex.exec(message)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
          regex.lastIndex++;
      }
      
      // The result can be accessed through the `m`-variable.

    m.forEach((match, groupIndex) => {
      if (match) {
        matches++
      }
    });
    // console.log(matches)
  }
  return matches;
}

module.exports = {
  testMessage
}