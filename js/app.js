const holes = document.querySelectorAll(".hole");
const moles = document.querySelectorAll(".mole");
const btnStart = document.querySelector("button");

const startScreen = document.querySelector(".start-screen");
const showScore = document.querySelector(".show-score");
let currentScore = document.querySelector(".class")

let score = 0;
let lastHole;
let timeUp = false;
let gameTime = 5000;
let increaseTime = 1;

const state = {
  gameTimer: 10
}

const randomTime = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
}

const randomHole = (holes) => {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];

  if (hole === lastHole) {
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

const peep = () =>{
  const time = randomTime(800, 1000);
  const hole = randomHole(holes);

  hole.classList.add("up");

  setTimeout(() => {
    hole.classList.remove("up");
    if (!timeUp) peep();
  }, time);
}


const start = () => {
  score = 0;
  // scoreBoard.textContent = score;
  timeUp = false;
  // scoreBoard.classList.remove("add");
  // startScreen.classList.add("hide");

  peep();

  timerStarting(() => {
    timeUp = true;
    // startScreen.classList.remove("hide");

    // if (score > 0) {
    //   showScore.classList.add("show");

    //   const message = "Your score: " + score + (score >= 10 ? " GREAT!" : "");
    //   showScore.innerText = message;
    // }

  }, gameTime);
}


function startTimer(display) {
  const gameTimer = setInterval(function () {
    // debugger

      // this is our starting timer reverse.
      // seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = `${state.gameTimer}`;
      state.gameTimer = --state.gameTimer
      if (state.gameTimer < 0) {
          console.log('END!')
          clearInterval(gameTimer)
      }
  }, 1000);
}

let timerStarting = () => {
  let fiveSeconds = 2,
      display = document.querySelector('#time');
  startTimer(display);
};


const bonk = (e) => {
  

    // scoreBoard.classList.add("add");
    state.gameTimer = state.gameTimer + increaseTime;
    console.log("GUACAMOLE!!!!")
    // scoreBoard.textContent = score;
    // debugger
  
}

moles.forEach(mole => {
  mole.addEventListener("click", bonk);
});

btnStart.addEventListener("click", start);
