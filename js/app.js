const holes = document.querySelectorAll(".hole");
const coders = document.querySelectorAll(".mole");
const btnStart = document.querySelector("button");
btnStart.className = "btnStr"

const startScreen = document.querySelector(".start-screen");
const showScore = document.querySelector(".show-score");
let currentScore = document.querySelector(".class");

let score = 0;
let lastHole;
let timeUp = false;
let increaseTime = 1;

const state = {
  gameTimer: 9
};


const peep = () => {
  const time = randomTime(400, 1000);
  const hole = randomHole(holes);

  hole.classList.add("up");

  setTimeout(() => {
    hole.classList.remove("up");
    if (state.gameTimer) peep();
  }, time);
};

const start = () => {
  state.gameTimer = 9
  timeUp = false;
  peep();

  timerStarting(() => {
    timeUp = true;
  }, state.gameTimer);
};

function startTimer(display) {
  const gameTimer = setInterval(function() {
    display.textContent = `${state.gameTimer}`;
    state.gameTimer = --state.gameTimer;
    if (state.gameTimer < 0) {
      console.log("END!");
      clearInterval(gameTimer);
    }
  }, 1000);
}

let timerStarting = () => {
    display = document.querySelector("#time");
  startTimer(display);
};

const bonk = e => {
  state.gameTimer = state.gameTimer + increaseTime;
  console.log("GUACAMOLE!!!!");
};

const randomTime = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};

const randomHole = holes => {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];

  if (hole === lastHole) {
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
};



coders.forEach(coder => {
  coder.addEventListener("click", bonk);
});

btnStart.addEventListener("click", start);



// COMMENT FOR AARON:
// time/score thing
// create a variable "totalScore" starting with 10, increments when you whack a coder
// when timer hits 0. show 'You lasted  "totalScore" seconds!' in score board 