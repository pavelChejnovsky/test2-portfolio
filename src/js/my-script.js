/*
    Initilaze variables for gameboard of pexeso

    --variable playLockout sets available during pick card
    -variable gameplay indicates if game is working or over

*/

var playLockout = false;
var gamePlay = false;
var tileImages = [],
  tileArray = [],
  tileFlippedOver = [];
var cardFlipped = -1;
var timer;
var startButton = document.getElementById('start');
var messageGame = document.getElementById('message');
var score = document.getElementById('score');
var gameBoard = document.getElementById('gameboard');
startButton.addEventListener('click', startGame);

/*

    Invoke function to start game

    --buildArray() is pushing images in jpg to array tileImages
    --tileArray is copy of tileImages
    --shuffleArray() randomly shuffle images in tileArray
    --buildBoard() is filling our gameboard images
*/

function startGame() {
  startButton.style.display = 'none';
  messageGame.innerHTML = "Let`s go begin!";
  if (!gamePlay) {
    gamePlay = true;
    buildArray();
    tileArray = tileImages.concat(tileImages);
    shuffleArray(tileArray);
    buildBoard();
  }
}


function buildArray() {
  for (var x = 1; x < 6; x++) {
    tileImages.push(x);
  }
}

function shuffleArray(array) {
  for (var x = array.length - 1; x > 0; x--) {
    var holder = Math.floor(Math.random() * (x + 1));
    var itemValue = array[x];
    array[x] = array[holder];
    array[holder] = itemValue;
  }
  return array;
}

function buildBoard() {
  var gameBoardHTML = "";
  var x = 0;
  tileArray.forEach(function(element) {
    x++;
    gameBoardHTML += '<div class="gameTile">';
    gameBoardHTML += '<img id="card' + x + '" src="../img/reference/pexeso/guessimage.png" onclick="pickCard(' + (x - 1) + ',this)" class="flipImage"></div>';
  });
  gameBoard.innerHTML = gameBoardHTML;
}

/*
    function pickCard compares selecting values by clicking

    --isInArray() return boolean of target
    --cardFlip() shows picture from tileArray by ID (this target)
    --checksrc() returns source image of target
    --gameOver() ends game if tileFlippedOver and tileArray lengths are equal
    --hideCard() hides card by poping values from tileFlippedOver array
*/

function pickCard(idPick, target) {
  // not in array of flipped over
  // not locked out
  if (!playLockout && !isInArray(target.id, tileFlippedOver)) {
    if (cardFlipped >= 0) {
      cardFlip(idPick, target);
      playLockout = true;
      if (checkSrc(tileFlippedOver[tileFlippedOver.length - 1]) == checkSrc(tileFlippedOver[tileFlippedOver.length - 2])) {
        messageGame.innerHTML = "Match Found";
        cardFlipped = -1;
        playLockout = false;
        if (tileFlippedOver.length == tileArray.length) {
          gameOver();
        }
      } else {
        messageGame.innerHTML = "No Match";
        timer = setInterval(hideCard, 1000);
      }
      //check to see if its a match
    } else {
      cardFlipped = idPick;
      cardFlip(idPick, target);
    }
  } else {
    messageGame.innerHTML = "Locked Out";
  }
}

function isInArray(v, array) {
  return array.indexOf(v) > -1;
}

function cardFlip(idPick, target) {
  target.src = "../img/reference/pexeso/picture" + tileArray[idPick] + ".png";
  tileFlippedOver.push(target.id);
}

function checkSrc(a) {
  return document.getElementById(a).src;
}

function gameOver() {
  messageGame.innerHTML = "Game Over";
  startButton.style.display = 'block';
  gamePlay = false;
  tileFlippedOver = [];
  tileImages = [];
  gameBoard.innerHTML = "";
}

function hideCard() {
  for (var x = 0; x < 2; x++) {
    var hideIDCard = tileFlippedOver.pop();
    document.getElementById(hideIDCard).src = '../img/reference/pexeso/guessimage.png';
  }
  clearInterval(timer);
  cardFlipped = -1;
  playLockout = false;
  messageGame.innerHTML = "Select Again";
}
