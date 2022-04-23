//Global Constants
const CLUE_PAUSE_TIME = 500; //how long to pause in between clues
const NEXT_CLUE_WAIT_TIME = 1000; //how long to wait  before playing sequence

//Global Variables
var pattern = [];
var randomNumber = 0;
var progress = 0;
var gamePlaying = false;
var tonePlaying = false;
var timerRunning = false;
var volume = 0.5;
var guessCounter = 0;
var timeLimit = 20;
var timePassed = 0;
var timeLeft = timeLimit;
var timerInterval = null;
var lengthOfPattern = 10;
var clueHoldTime = 3500; //how long to hold each clue's light/sound
var displayClueHoldTime = 3.5;
var changeHoldTimeBy = -50;
var displayChangeHoldTimeBy = -0.05;
var strikes = 0;
var strikeLimit = 3;

//Set Strikes, Time, Clue length and +/- Clue Length to default values

document.getElementById("strikes").innerHTML = "Strikes: " + strikes;
document.getElementById("timerFormat").innerHTML = formatTime(timeLeft);
document.getElementById("clueLengthHoldTime+/-").innerHTML =
  "+/- Clue Time Each Turn: " + displayChangeHoldTimeBy + " second(s)";
document.getElementById("currentHoldTime").innerHTML =
  "Clue Time: " + displayClueHoldTime + " second(s)";
document.getElementById("strikeLimit").innerHTML =
  strikeLimit + " strikes you're out!";
document.getElementById("timeLimit").innerHTML =
  "Time Limit: " + formatTime(timeLeft);

document.getElementById("currentLength").innerHTML =
  "Pattern Length: " + lengthOfPattern;

//  --------**END OF DESCRIBED CODE BLOCK**--------

function toggleTheme() {
  document.getElementById("strike").classList.toggle("dark-mode");
  document.getElementById("body").classList.toggle("dark-mode");
  document.getElementById("heading").classList.toggle("dark-mode");
  document.getElementById("paragraph").classList.toggle("dark-mode");
  document.getElementById("timerFormat").classList.toggle("dark-mode");
  document.getElementById("bottomMenuBar").classList.toggle("dark-mode");
  document.getElementById("screenDirection").classList.toggle("dark-mode");
  document.getElementById("home-section").classList.toggle("dark-mode");
}

//Gets value from user textbox to keep track of the length the user wants to set
function getLengthOfPattern() {
  lengthOfPattern = document.getElementById("patternlength").value;
  document.getElementById("currentLength").innerHTML =
    "Pattern Length: " + lengthOfPattern;

  console.log("Length of pattern: " + lengthOfPattern);
}

//  --------**END OF FUNCTION**--------

//Gets value from user textbox to set clueHoldTime to user's desired value
function getClueHoldTime() {
  clueHoldTime = document.getElementById("clueHoldTime").value * 1000;
  displayClueHoldTime = document.getElementById("clueHoldTime").value;

  if (clueHoldTime == 0) {
    clueHoldTime = 3500;
    displayClueHoldTime = 3.5;
  }

  document.getElementById("currentHoldTime").innerHTML =
    "Current Clue Length: " + displayClueHoldTime + " Second(s)";

  console.log("clueHoldTime: " + clueHoldTime + " milliseconds");
}
//  --------**END OF getClueHoldTime() FUNCTION**--------

//Gets value from user textbox to set the +/- of clueHoldTime each turn to user's desired value

function getChangeHoldTime() {
  changeHoldTimeBy = document.getElementById("changeHoldTime").value * 1000;
  displayChangeHoldTimeBy = document.getElementById("changeHoldTime").value;

  document.getElementById("clueLengthHoldTime+/-").innerHTML =
    "Change Clue Length Each Turn by: " +
    displayChangeHoldTimeBy +
    " Second(s)";

  console.log("changeHoldTime: " + changeHoldTimeBy + " milliseconds");
}
//  --------**END OF getChangeHoldTime() FUNCTION**--------

//Updates clueHoldTime by +/- the clueHoldTime by the user's desired value
function updateClueHoldTime() {
  clueHoldTime += changeHoldTimeBy;
  displayClueHoldTime += displayChangeHoldTimeBy;
  displayClueHoldTime = Math.round(100 * displayClueHoldTime) / 100;

  document.getElementById("currentHoldTime").innerHTML =
    "Current Clue Length: " + displayClueHoldTime + " Second(s)";
}
//  --------**END OF updateClueHoldTime() FUNCTION**--------

//Gets value from user textbox to set the amount of strikes in order to lose

function getChangeStrikes() {
  strikeLimit = document.getElementById("changeStrikes").value;
  document.getElementById("strikeLimit").innerHTML =
    strikeLimit + " strikes you're out!";
}

//Updates the amount of strikes in order to lose by the user's desired value
function getChangeTime() {
  timeLimit = document.getElementById("changeTime").value;
  document.getElementById("timeLimit").innerHTML =
    "Time Limit: " + formatTime(timeLeft);
  document.getElementById("timerFormat").innerHTML = formatTime(timeLeft);
  timeLeft = timeLimit;
}

function resetSettings() {
  document.getElementById("patternlength").value = "";
  document.getElementById("clueHoldTime").value = "";
  document.getElementById("changeHoldTime").value = "";
  document.getElementById("changeStrikes").value = "";
  document.getElementById("changeTime").value = "";

  timeLimit = 20;
  timeLeft = timeLimit;
  lengthOfPattern = 10;
  clueHoldTime = 3500; //how long to hold each clue's light/sound
  displayClueHoldTime = 3.5;
  changeHoldTimeBy = -50;
  displayChangeHoldTimeBy = -0.05;
  strikes = 0;
  strikeLimit = 3;

  document.getElementById("currentLength").innerHTML =
    "Current Length: " + lengthOfPattern;

  document.getElementById("currentHoldTime").innerHTML =
    "Current Clue Length: " + displayClueHoldTime + " Second(s)";

  document.getElementById("clueLengthHoldTime+/-").innerHTML =
    "Change Clue Length Each Turn by: " +
    displayChangeHoldTimeBy +
    " Second(s)";

  document.getElementById("strikeLimit").innerHTML =
    strikeLimit + " strikes you're out!";

  document.getElementById("timeLimit").innerHTML =
    "Time Limit: " + formatTime(timeLeft);

  document.getElementById("timerFormat").innerHTML = formatTime(timeLeft);

  document.getElementById("timeLimit").innerHTML =
    "Time Limit: " + formatTime(timeLeft);
}
/* If user selects a clue as the computer gives the clues
before the timer starts they automatically lose! */
function doNotCheat() {
  if (timerRunning == false && gamePlaying == true) {
    cheaterLoseGame();
  }
}
//  --------**END OF doNotCheat() FUNCTION**--------

// --------**TIMER FUNCTIONS**--------
function stopTimer() {
  clearInterval(timerInterval);
}

function startTimer() {
  if (gamePlaying == true) {
    timerRunning = true;

    document.getElementById("screenDirection").innerHTML =
      "Repeat the pattern!";

    timerInterval = setInterval(function () {
      timePassed = timePassed += 1; //Keeptrack of time passed
      timeLeft = timeLimit - timePassed;
      document.getElementById("timerFormat").innerHTML = formatTime(timeLeft);

      if (timeLeft < 0) {
        loseGame();
      }
    }, 1000);
  }
}
function resetTimer() {
  stopTimer();
  timerInterval = null;
  timePassed = 0;
  timeLeft = timeLimit;
  document.getElementById("timerFormat").innerHTML = formatTime(timeLeft);
  document.getElementById("screenDirection").innerHTML = "";

  timerRunning = false;
}

function formatTime(timeLeft) {
  var seconds = timeLeft % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${0}:${seconds}`;
}
//  --------**END OF TIMER FUNCTIONS**--------

// --------**RANDOM SEQUENCE GENERATOR**--------
function getRandomPattern(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  for (let j = 0; j < lengthOfPattern; j++) {
    var randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    pattern.push(randomNumber);
  }
  console.log(pattern);
}
// --------**END OF RANDOM SEQUENCE GENERATOR**--------

// --------**START/STOP GAME FUNCTIONS**--------

function startGame() {
  //initialize game variables
  strikes = 0;
  progress = 0;
  gamePlaying = true;
  pattern = [];

  //swap the Start and Stop buttons
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  getRandomPattern(1, 6);
  playClueSequence();
}

function stopGame() {
  gamePlaying = false;
  strikes = 0;
  getClueHoldTime();

  //swap the Start and Stop buttons
  document.getElementById("strikes").innerHTML = "Strikes: " + strikes;
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
  if ((gamePlaying = false)) {
    document.getElementById("screenDirection").innerHTML = "";
  }

  for (let l = 1; l < 7; l++) {
    removeImage(l);
    pauseMyAudio(l);
    clearButton(l);
  }

  resetTimer();
}
// --------**END OF START/STOP GAME FUNCTIONS**--------

// --------**LIGHT BUTTON WHEN PLAYING FUNCTION**--------
function lightButton(btn) {
  document.getElementById("button" + btn).classList.add("lit");
}
// --------**END OF FUNCTION**--------

// --------**STOP ALL VISUAL AND AUDIO CLUES FUNCTION**--------
function clearButton(btn) {
  document.getElementById("button" + btn).classList.remove("lit");
  pauseMyAudio(btn);
  removeImage(btn);
}
// --------**END OF FUNCTION**--------

// --------**PLAY CLUES FUNCTIONS**--------
function playSingleClue(btn) {
  if (gamePlaying) {
    lightButton(btn);
    playMyAudio(btn, clueHoldTime);
    setTimeout(clearButton, clueHoldTime, btn);
    displayImage(btn);
  }
  if (gamePlaying == true) {
    document.getElementById("screenDirection").innerHTML = "Playing Pattern!"; //DISPLAY "PlAYING PATTERN" TO THE USER
  }
}

function playClueSequence() {
  guessCounter = 0;
  context.resume();
  let delay = NEXT_CLUE_WAIT_TIME; //set delay to initial wait time
  for (let i = 0; i <= progress; i++) {
    // for each clue that is revealed so far
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms");
    setTimeout(playSingleClue, delay, pattern[i]); // set a timeout to play that clue
    delay += clueHoldTime;
    delay += CLUE_PAUSE_TIME;
  }
  console.log("clueHoldTime: " + clueHoldTime);
  setTimeout(startTimer, delay);
}
// --------**END OF PLAY CLUES FUNCTIONS**--------

// --------**STOP GAME FUNCTIONS**--------
function cheaterLoseGame() {
  stopGame();
  alert(
    "Game Over. You lost. Please wait until the timer starts to repeat the pattern. "
  );
}
function loseGame() {
  stopGame();
  alert("Game Over. You lost. 😢");
}
function winGame() {
  stopGame();
  alert("Game Over. You won! 😃");
}
// --------**END OF STOP GAME FUNCTIONS**--------

// --------**GAME LOGIC FUNCTION**--------
function guess(btn) {
  console.log("user guessed: " + btn);

  if (!gamePlaying) {
    return;
  }

  if (pattern[guessCounter] == btn) {
    //Guess was correct!
    if (guessCounter == progress) {
      if (progress == pattern.length - 1) {
        //GAME OVER: WIN!
        winGame();
      } else {
        //Pattern correct. Add next segment
        progress++;
        updateClueHoldTime();
        playClueSequence();
        resetTimer();
      }
    } else {
      //so far so good... check the next guess
      guessCounter++;
    }
  } else {
    strikes++;
    document.getElementById("strikes").innerHTML = "Strikes: " + strikes;
  }
  if (strikes == strikeLimit) {
    document.getElementById("strikes").innerHTML = "Strikes: " + strikes;
    //Guess was incorrect
    //GAME OVER: LOSE!
    loseGame();
  }
}
// --------**END OF GAME LOGIC FUNCTION**--------

// --------**IMAGE FUNCTIONS**--------

function displayImage(btn) {
  var element;
  if (btn == 1) {
    element = document.getElementById("guitarImage");
  }
  if (btn == 2) {
    element = document.getElementById("drumImage");
  }
  if (btn == 3) {
    element = document.getElementById("pianoImage");
  }
  if (btn == 4) {
    element = document.getElementById("violinImage");
  }
  if (btn == 5) {
    element = document.getElementById("saxophoneImage");
  }
  if (btn == 6) {
    element = document.getElementById("trumpetImage");
  }

  element.classList.remove("hiddenImage");
  element.style.display = "block";
}

function removeImage(btn) {
  var element;
  if (btn == 1) {
    element = document.getElementById("guitarImage");
  }
  if (btn == 2) {
    element = document.getElementById("drumImage");
  }
  if (btn == 3) {
    element = document.getElementById("pianoImage");
  }
  if (btn == 4) {
    element = document.getElementById("violinImage");
  }
  if (btn == 5) {
    element = document.getElementById("saxophoneImage");
  }
  if (btn == 6) {
    element = document.getElementById("trumpetImage");
  }

  element.classList.add("hiddenImage");
}
// --------**END OF IMAGE FUNCTIONS**--------

// --------**AUDIO FUNCTIONS**--------

function playMyAudio(btn, len) {
  var audio;
  if (btn == 1) {
    audio = document.getElementById("guitarAudio");
  }
  if (btn == 2) {
    audio = document.getElementById("drumsAudio");
  }
  if (btn == 3) {
    audio = document.getElementById("pianoAudio");
  }
  if (btn == 4) {
    audio = document.getElementById("violinAudio");
  }
  if (btn == 5) {
    audio = document.getElementById("saxophoneAudio");
  }
  if (btn == 6) {
    audio = document.getElementById("trumpetAudio");
  }

  if (audio.paused) {
    audio.currentTime = 0;
    audio.play();
  } else {
    audio.play();
  }
  setTimeout(function () {
    stopTone();
  }, len);
}

function pauseMyAudio(btn) {
  var pauseAudio;
  if (btn == 1) {
    pauseAudio = document.getElementById("guitarAudio");
  }
  if (btn == 2) {
    pauseAudio = document.getElementById("drumsAudio");
  }
  if (btn == 3) {
    pauseAudio = document.getElementById("pianoAudio");
  }
  if (btn == 4) {
    pauseAudio = document.getElementById("violinAudio");
  }
  if (btn == 5) {
    pauseAudio = document.getElementById("saxophoneAudio");
  }
  if (btn == 6) {
    pauseAudio = document.getElementById("trumpetAudio");
  }

  pauseAudio.pause();
}

function stopTone() {
  g.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025);
  tonePlaying = false;
}
// --------**END OF AUDIO FUNCTIONS**--------

// --------**OTHER AUDIO VARIABLES AND AUDIO CODE**--------

// Page Initialization
// Init Sound Synthesizer
var AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();
var o = context.createOscillator();
var g = context.createGain();
g.connect(context.destination);
g.gain.setValueAtTime(0, context.currentTime);
o.connect(g);
o.start(0);
// --------**END OF OTHER AUDIO VARIABLES AND AUDIO CODE**--------
