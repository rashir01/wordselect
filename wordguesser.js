import { words } from "./words.js";
let fiveLetterWords = words;
let balckLetters = [];
let greenLetters = ["*", "*", "*", "*", "*"];
let yellowLetters = [];

let rankedSuggestions = new Map();

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

function generateMatchingWords() {
  fiveLetterWords = words;
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
}

function generateRankedWords() {
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
}

function readBlackLetters() {
  balckLetters = [];
  let rawBlackLetters = $("#blackLetters").val().trim().toLowerCase();
  balckLetters = rawBlackLetters.split("");
}

function readGreenLetters() {
  greenLetters = ["*", "*", "*", "*", "*"];
  for (let i = 0; i < greenLetters.length; i++) {
    greenLetters[i] = $(`#green${i}`).val();
  }
}

function readYellowLetters() {
  yellowLetters = [];
  //get how many items are there in the list
  var count = $("#yellowLetters").children().length;
  for (let i = 0; i < count; i++) {
    let currentLetter = $(`#yellowletter${i}`).val().toLowerCase().charAt(0);
    let currentPosition = $(`#yellowpos${i}`).val();
    if (currentLetter != "*" && currentLetter != "")
      yellowLetters.push({ letter: currentLetter, position: currentPosition });
  }
}

function displayRankedWords() {
  let count = 0;
  $("#results").empty();
  for (const [key, value] of rankedSuggestions.entries()) {
    $(`<li>${key} rank: ${value}</li>`).appendTo("#results");
    count++;
    if (count == 20) break;
  }

  console.log(rankedSuggestions);
}

function handleSearchButtonClick(event) {
  event.preventDefault();
  rankedSuggestions = new Map();
  readBlackLetters();
  readGreenLetters();
  readYellowLetters();
  generateMatchingWords();
  generateRankedWords();
  displayRankedWords();
}

$("#findWordsBtn").click(handleSearchButtonClick);
