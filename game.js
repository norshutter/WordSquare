const wordListUrl = 'https://gist.githubusercontent.com/paulcc/3799331/raw/74207b4ee400469ddbb61d297dbd62f31a3407ce/gistfile1.txt';

// Define the letters along each side of the game board
const letters = [
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", 
  "N", "O", "P","Q", "R", "S", "T", "U", "V", "W", "Y", "Z",
];

// Select the letter button and display area
const letterDisplay1 = document.querySelector("#letter-display1");
const letterDisplay2 = document.querySelector("#letter-display2");
const letterDisplay3 = document.querySelector("#letter-display3");

// Keep track of the currently selected letter
var currentSelectedLetter = null;

// Define an array of all the squares on the game board
const squares = document.querySelectorAll(".square");
const legalSquares = document.querySelectorAll(".square:not(.illegal)");

// Define a function to select a random letter from the letters array
function getRandomLetter() {
  const randomIndex = Math.floor(Math.random() * letters.length);
  return letters[randomIndex];
}

function checkCorrectWords() {
  alert("Checking for correct words now");
  
  // Get the words from the squares
  const words = [];
  legalSquares.forEach(function(square) {
    const letter = square.textContent;
    if (letter !== '') {
      words.push(letter);
    }
  });
  // Check if all the squares have letters
  if (words.length === legalSquares.length) {
    // Check if the words exist in the word list
    const foundWords = words.filter(function(word) {
      return wordList.includes(word);
    });
    // Display the results
    const resultDiv = document.querySelector("#result");
    if (foundWords.length === words.length) {
      resultDiv.textContent = "Congrats, you win!";
    } else {
      resultDiv.textContent = "You failed, some of these words aren´t real!";
    }
  } else {
    // Not all squares have letters
    alert("Please fill in all squares before checking.");
  }
}


document.addEventListener("DOMContentLoaded", function() {


  // Add event listeners to the letter displays
  letterDisplay1.addEventListener("click", function() {
    letterDisplay1.classList.add("selected");
    letterDisplay2.classList.remove("selected");
    letterDisplay3.classList.remove("selected");
    currentSelectedLetter = letterDisplay1.textContent;
  });

  letterDisplay2.addEventListener("click", function() {
    letterDisplay1.classList.remove("selected");
    letterDisplay2.classList.add("selected");
    letterDisplay3.classList.remove("selected");
    currentSelectedLetter = letterDisplay2.textContent;
  });

  letterDisplay3.addEventListener("click", function() {
    letterDisplay1.classList.remove("selected");
    letterDisplay2.classList.remove("selected");
    letterDisplay3.classList.add("selected");
    currentSelectedLetter = letterDisplay3.textContent;
  })

  // Add an event listener to each square
  squares.forEach(function(square) {
    square.addEventListener("click", function() {
      // Get the current letter
      const letter = currentSelectedLetter;
      
      if (letter == null) {
        return;
      }
      
      // Check if the square is empty
      if (square.textContent === '') {
        // Add the letter to the square
        square.textContent = letter;
      
        letterDisplay1.textContent = getRandomLetter();
        letterDisplay2.textContent = getRandomLetter();
        letterDisplay3.textContent = getRandomLetter();
        
        
        letterDisplay1.classList.remove("selected");
        letterDisplay2.classList.remove("selected");
        letterDisplay3.classList.remove("selected");
        
        currentSelectedLetter = null;
        
      }
      
      // Check if all squares have content
      const allSquaresFilled = Array.from(legalSquares).every(square => {
        return square.textContent.trim() !== ''
      });
      console.log("All squares filled",allSquaresFilled, Array.from(legalSquares));
      if (allSquaresFilled) {
        // Call the checkCorrectWords function
        checkCorrectWords();
      }
    });
  });

  // Display the letter in the letter display area
  letterDisplay1.textContent = getRandomLetter();
  letterDisplay2.textContent = getRandomLetter();
  letterDisplay3.textContent = getRandomLetter();

  // Load the word list from the URL
  var wordList = null;

  fetch(wordListUrl)
    .then(response => response.text())
    .then(wordListText => {
      // Split the text into an array of words
      wordList = wordListText.split("\n");
  });
});