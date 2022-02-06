console.log("hello world");
var words = require("an-array-of-english-words");
var fiveLetterWords = words.filter((d) => {
  return d.length == 5;
});

// var wordsStartingWithC = fiveLetterWords.filter((d) => {
//   return d[0] == "c";
// });
let balckLetters = ["e", "d", "s", "b", "i", "h", "n", "g"];
let greenletters = ["a", "l", "o"];

// handle black letters
fiveLetterWords = fiveLetterWords.filter((d) => {
  for (let i = 0; i < balckLetters.length; i++) {
    if (d.indexOf(balckLetters[i]) != -1) return false;
  }
  return true;
});

// handle green letters
fiveLetterWords = fiveLetterWords.filter((d) => {
  for (let i = 0; i < greenletters.length; i++) {
    if (greenletters[i] != "*") {
      if (d.indexOf(greenletters[i]) != i) {
        return false;
      }
    }
  }
  return true;
});

fiveLetterWords = fiveLetterWords.filter((d) => {
  return d.indexOf("a") != -1 && d.indexOf("l") != -1 && d.indexOf("o") != -1;
});

// fiveLetterWords = fiveLetterWords.filter((d) => {
//   return (
//     d.indexOf("l") == 1 &&
//     d.indexOf("l") != 4 &&
//     d.indexOf("l") != 0 &&
//     d.indexOf("a") != 2 &&
//     d.indexOf("a") == 0 &&
//     d.indexOf("o") == 2
//   );
// });

// var eIsNotSecondLetter = startWithCAndNoA.filter((d) => {
//   return d.indexOf("e") != 1;
// });

console.log(fiveLetterWords);
console.log(`black letters ${balckLetters}`);
