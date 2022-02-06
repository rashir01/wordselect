const words = require("an-array-of-english-words");
let fiveLetterWords = words.filter((d) => {
  return d.length == 5;
});

let balckLetters = ["s", "p", "a", "c", "e", "h"];
let greenLetters = ["m"];
let yellowLetters = [
  { letter: "n", position: 2 },
  { letter: "t", position: 3 },
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
