const desks = document.querySelectorAll(".desk");
const coders = document.querySelectorAll(".coder");
const btnStart = document.querySelector("button");
btnStart.className = "btnStr"

const startScreen = document.querySelector(".start-screen");
const showScore = document.querySelector(".show-score");
let currentScore = document.querySelector(".class");

let score = 0;
let lastDesk;
let timeUp = false;
let increaseTime = 1;

let gameTimer = 9;


const peep = () => {
  const time = randomTime(400, 1000);
  const desk = randomDesk(desks);

  desk.classList.add("up");

  setTimeout(() => {
    desk.classList.remove("up");
    if (gameTimer) peep();
  }, time);
};

const start = () => {
  gameTimer = 9
  timeUp = false;
  peep();

  timerStarting(() => {
    timeUp = true;
  }, gameTimer);
};

function startTimer(display) {
  const gameTimerShow = setInterval(function() {
    display.textContent = `${gameTimer}`;
    gameTimer = --gameTimer;
    if (gameTimer < 0) {
      console.log("END!");
      clearInterval(gameTimerShow);
    }
  }, 1000);
}

let timerStarting = () => {
    display = document.querySelector("#time");
  startTimer(display);
};

const bonk = e => {
  gameTimer = gameTimer + increaseTime;
  console.log("GUACAcoder!!!!");
};

const randomTime = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};

const randomDesk = desks => {
  const idx = Math.floor(Math.random() * desks.length);
  const desk = desks[idx];

  if (desk === lastDesk) {
    return randomDesk(desks);
  }
  lastDesk = desk;
  return desk;
};



coders.forEach(coder => {
  coder.addEventListener("click", bonk);
});

btnStart.addEventListener("click", start);



// COMMENT FOR AARON:
// time/score thing
// create a variable "totalScore" starting with 10, increments when you whack a coder
// when timer hits 0. show 'You lasted  "totalScore" seconds!' in score board 