//Global Constants
const TIME_LIMIT = 20;
const CLUE_PAUSE_TIME = 500; //how long to pause in between clues
const NEXT_CLUE_WAIT_TIME = 1000; //how long to wait  before playing sequence

//Global Variables
var clueHoldTime = 3500; //how long to hold each clue's light/sound
var pattern = [];
var randomNumber = 0;
var progress = 0;
var gamePlaying = false;
var tonePlaying = false;
var timerRunning = false;
var volume = 0.5;
var guessCounter = 0;
var strikes = 0;
var timePassed = 0;
var timeLeft = TIME_LIMIT;
var timerInterval = null;
var lengthOfPattern = 10;

//Set Strikes and Time to default values
document.getElementById("strikes").innerHTML = "Strikes: " + strikes;
document.getElementById("timerFormat").innerHTML =
  "Time: " + formatTime(timeLeft);

//Gets value from user textbox to keep track of the length the user wants to set
function getLengthOfPattern() {
  lengthOfPattern = document.getElementById("patternlength").value;
  document.getElementById("currentLength").innerHTML =
    "Current Length: " + lengthOfPattern;

  console.log(lengthOfPattern);
}

/* If user selects a clue as the computer gives the clues
before the timer starts they automatically lose! */
function doNotCheat() {
  if (timerRunning == false && gamePlaying == true) {
    cheaterLoseGame();
  }
}

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
      timeLeft = TIME_LIMIT - timePassed;
      document.getElementById("timerFormat").innerHTML =
        "Time: " + formatTime(timeLeft);

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
  timeLeft = TIME_LIMIT;
  document.getElementById("timerFormat").innerHTML =
    "Time: " + formatTime(timeLeft);
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

// --------**START/STOP GAME FUNCTIONS**--------

function startGame() {
  //initialize game variables
  strikes = 0;
  clueHoldTime = 3500;
  progress = 0;
  gamePlaying = true;
  //swap the Start and Stop buttons
  pattern = [];
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  getRandomPattern(1, 6);
  playClueSequence();
}

function stopGame() {
  gamePlaying = false;
  strikes = 0;

  //swap the Start and Stop buttons
  document.getElementById("strikes").innerHTML = "Strikes: " + strikes;
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
  document.getElementById("screenDirection").innerHTML = "";

  for (let l = 1; l < 7; l++) {
    removeImage(l);
    pauseMyAudio(l);
    clearButton(l);
  }

  resetTimer();
}

// --------**LIGHT BUTTON WHEN PLAYING FUNCTION**--------
function lightButton(btn) {
  document.getElementById("button" + btn).classList.add("lit");
}

// --------**STOP ALL VISUAL AND AUDIO CLUES FUNCTION**--------

function clearButton(btn) {
  document.getElementById("button" + btn).classList.remove("lit");
  pauseMyAudio(btn);
  removeImage(btn);
}

// --------**PLAY CLUES FUNCTIONS**--------

function playSingleClue(btn) {
  if (gamePlaying) {
    lightButton(btn);
    playMyAudio(btn, clueHoldTime);
    setTimeout(clearButton, clueHoldTime, btn);
    displayImage(btn);
  }
}

function playClueSequence() {
  guessCounter = 0;
  context.resume();
  let delay = NEXT_CLUE_WAIT_TIME; //set delay to initial wait time
  for (let i = 0; i <= progress; i++) {
    // for each clue that is revealed so far

    clueHoldTime -= 50;
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms");
    setTimeout(playSingleClue, delay, pattern[i]); // set a timeout to play that clue
    delay += clueHoldTime;
    delay += CLUE_PAUSE_TIME;
    console.log("clueHoldTime: " + clueHoldTime);
  }

  setTimeout(startTimer, delay);
}
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
  if (strikes == 3) {
    document.getElementById("strikes").innerHTML = "Strikes: " + strikes;
    //Guess was incorrect
    //GAME OVER: LOSE!
    loseGame();
  }
}

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

// Sound Synthesis Functions
/*const freqMap = {
  1: 261.6,
  2: 329.6,
  3: 392,
  4: 466.2,
  5: 496.7,
  6: 596.5,
};
function playTone(btn, len) {
  o.frequency.value = freqMap[btn];
  g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
  context.resume();
  tonePlaying = true;
  setTimeout(function () {
    stopTone();
  }, len);
}
function startTone(btn) {
  if (!tonePlaying) {
    context.resume();
    o.frequency.value = freqMap[btn];
    g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
    context.resume();
    tonePlaying = true;
  }
}*/
function stopTone() {
  g.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025);
  tonePlaying = false;
}

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
