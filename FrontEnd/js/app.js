const desks = document.querySelectorAll(".desk");
const coders = document.querySelectorAll(".coder");
const btnStart = document.querySelector("button");
btnStart.className = "btnStr";

const startScreen = document.querySelector(".start-screen");
const showScore = document.querySelector(".show-score");
let currentScore = document.querySelector(".class");

let score = 0;
let lastDesk;
let timeUp = false;
let increaseTime = 1;

let gameTimer = 9;

const peep = () => {
  const time = randomTime(500, 1000);
  const desk = randomDesk(desks);

  desk.classList.add("up");

  setTimeout(() => {
    desk.classList.remove("up");
    if (gameTimer) peep();
  }, time);
};

const start = () => {
  gameTimer = 9;
  timeUp = false;
  peep();

  timerStarting(() => {
    timeUp = true;
  }, gameTimer);
};

const startTimer = display => {
  const gameTimerShow = setInterval(function() {
    display.textContent = `${gameTimer}`;
    gameTimer = --gameTimer;
    startTime;
    if (gameTimer < 0) {
      console.log("END!");
      let finalTime = Date.now() - startTime; //we will pass final time to the post function.
      clearInterval(gameTimerShow);
      debugger;
    }
  }, 1000);
};

let startTime = Date.now();
// let finalTime = Date.now();


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

const scoreBoard = () => {
  fetch("http://localhost:3000/scores")
    .then(resp => resp.json())
    .then(resp => console.log(resp));
};

//create a timer on the event listner start.

coders.forEach(coder => {
  coder.addEventListener("click", bonk);
});

btnStart.addEventListener("click", start); // here I have to add the timer start

//timer does not need to be on the page

// COMMENT FOR AARON:
// time/score thing
// create a variable "totalScore" starting with 10, increments when you whack a coder
// when timer hits 0. show 'You lasted  "totalScore" seconds!' in score board
