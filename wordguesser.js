// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
//import { words } from "an-array-of-english-words";
import { words } from "./words.js";
let fiveLetterWords = words;

//get a list of all five letter words
// let fiveLetterWords = words.filter((d) => {
//   return d.length == 5;
// });

//get a score for every time a letter appears in a word. this will be used for ranking
const letterRank = new Map();
letterRank.set("s", 6507);
letterRank.set("e", 6500);
letterRank.set("a", 5843);
letterRank.set("o", 4312);
letterRank.set("r", 4072);
letterRank.set("i", 3661);
letterRank.set("l", 3299);
letterRank.set("t", 3238);
letterRank.set("n", 2894);
letterRank.set("u", 2442);
letterRank.set("d", 2388);
letterRank.set("y", 2016);
letterRank.set("c", 1972);
letterRank.set("p", 1967);
letterRank.set("m", 1930);
letterRank.set("h", 1711);
letterRank.set("g", 1608);
letterRank.set("b", 1589);
letterRank.set("k", 1468);
letterRank.set("f", 1088);
letterRank.set("w", 1015);
letterRank.set("v", 675);
letterRank.set("z", 414);
letterRank.set("j", 276);
letterRank.set("x", 274);
letterRank.set("q", 106);

// get black letters from html
let balckLetters = [];

//get green letters from html
let greenLetters = ["*", "*", "*", "*", "*"];

//get yellow letters from html
let yellowLetters = [
  // { letter: "r", position: 1 },
  // { letter: "e", position: 4 },
  // { letter: "l", position: 0 },
  // { letter: "r", position: 2 },
  // { letter: "o", position: 1 },
  // { letter: "l", position: 0 },
  // { letter: "l", position: 2 },
  // { letter: "s", position: 2 },
  // { letter: "i", position: 4 },
  // // { letter: "t", position: 0 },
  // { letter: "o", position: 1 },
  // { letter: "a", position: 2 },
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
      // start the search from index i to account for repeated letters
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

// rank words based on their letter score. ignore duplicate letters.
let rankedSuggestions = new Map();
for (let i = 0; i < fiveLetterWords.length; i++) {
  let currentWord = fiveLetterWords[i];
  let rank = 0;
  //determine word rank using the letter rank map
  for (let j = 0; j < currentWord.length; j++) {
    // ignore duplicates
    if (currentWord.indexOf(currentWord[j]) == j) {
      rank += letterRank.get(currentWord[j]);
    }
  }
  rankedSuggestions.set(currentWord, rank);
}
// sort the ranked word map highest first
rankedSuggestions = new Map(
  [...rankedSuggestions.entries()].sort((a, b) => b[1] - a[1])
);

console.dir(rankedSuggestions, { maxArrayLength: null });
// console.log(fiveLetterWords);

function readBlackLetters() {
  balckLetters = [];
  let rawBlackLetters = $("#blackLetters").val().trim().toLowerCase();
  balckLetters = rawBlackLetters.split("");
}

function readGreenLetters() {
  greenLetters = [];
  for (let i = 0; i < greenLetters.length; i++) {
    greenLetters[i] = $(`#green${i}`).val();
  }
}

function readYellowLetters() {
  yellowLetters = [];
  //get how many items are there in the list
  var count = $("#yellowLetters").children().length;
  console.log("count is " + count);
  for (let i = 0; i < count; i++) {
    let currentLetter = $(`#yellowletter${i}`).val();
    let currentPosition = $(`#yellowpos${i}`).val();
    yellowLetters.push({ letter: currentLetter, position: currentPosition });
  }
  console.log(yellowLetters);
  //iterate and assign to the array
}

function handleSearchButtonClick(event) {
  event.preventDefault();
  console.log(event.target);

  readBlackLetters();
  readGreenLetters();
  readYellowLetters();
  // read yellow letters

  //read the value of the search field and store it
  // let userInput=$("#searchInput").val().trim();
  // //call the news api to get the news
  // callNewsApi(userInput);
  // console.log(userInput);
  // //call the stockprice api to get the data
  // callStockPriceApi(userInput);
  // //call the news api to get the news
  // callNewsApi(userInput)
  // $('#searchInput').val(' ')
}

$("#findWordsBtn").click(handleSearchButtonClick);
