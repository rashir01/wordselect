console.log("hello world");
var words = require("an-array-of-english-words");
var fiveLetterWords = words.filter((d) => {
  return d.length == 5;
});

// var wordsStartingWithC = fiveLetterWords.filter((d) => {
//   return d[0] == "c";
// });
let balckLetters = ["e", "d", "s", "b", "i", "h", "n", "g"];
let greenLetters = ["a", "l", "o"];
let yellowLetters = [
  { letter: "a", position: 2 },
  { letter: "l", position: 3 },
  { letter: "o", position: 0 },
];

// handle black letters
fiveLetterWords = fiveLetterWords.filter((d) => {
  for (let i = 0; i < balckLetters.length; i++) {
    if (d.indexOf(balckLetters[i]) != -1) return false;
  }
  return true;
});

// handle green letters
fiveLetterWords = fiveLetterWords.filter((d) => {
  for (let i = 0; i < greenLetters.length; i++) {
    if (greenLetters[i] != "*") {
      if (d.indexOf(greenLetters[i]) != i) {
        return false;
      }
    }
  }
  return true;
});

// handle yellow letters

fiveLetterWords = fiveLetterWords.filter((d) => {
  for (let i = 0; i < yellowLetters.length; i++) {
    if (
      d.indexOf(yellowLetters[i].letter) == -1 ||
      d.indexOf(yellowLetters[i].letter) == yellowLetters[i].position
    ) {
      return false;
    }
  }
  return true;
});

console.log(fiveLetterWords);
console.log(`black letters ${balckLetters}`);

console.log(JSON.stringify(yellowLetters));
console.log(yellowLetters.length);
