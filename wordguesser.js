const words = require("an-array-of-english-words");
let fiveLetterWords = words.filter((d) => {
  return d.length == 5;
});

let balckLetters = ["r", "e", "a", "o", "p", "t", "h", "y"];
let greenLetters = ["s", "*", "i", "l", "*"];
let yellowLetters = [
  { letter: "s", position: 4 },
  { letter: "l", position: 1 },
  // { letter: "i", position: 4 },
  // { letter: "t", position: 3 },
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
      if (d.indexOf(greenLetters[i], i) != i) {
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
