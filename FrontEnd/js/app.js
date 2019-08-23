const desks = document.querySelectorAll(".desk");
const coders = document.querySelectorAll(".coder");
const btnStart = document.querySelector("#button");
const usernameForm = document.querySelector("#usernameForm");

// const startScreen = document.querySelector(".start-screen");

const inputField = document.querySelector("#username");
btnStart.className = "btnStr";

const showScore = document.querySelector(".show-score");
let currentScore = document.querySelector(".class");
let splashScreen = document.querySelector(".splash-screen");
let eventListener = null;

const board = document.querySelector("#leaderboard");
const div = document.createElement("div");
const ol = document.createElement("ol");

let score = 0;
let lastDesk;
let timeUp = false;
let increaseTime = 1;

// let gameTimer = 2;

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
  gameTimer = 4;

  timeUp = false;
  peep();

  timerStarting();
};

let timerStarting = () => {
  display = document.querySelector("#time");
  let startTime = Date.now();
  startTimer(display, startTime);
};

const startTimer = (display, startTime) => {
  const gameTimerShow = setInterval(function() {
    display.textContent = `${gameTimer}`;
    gameTimer = --gameTimer;
    startTime;
    if (gameTimer < 0) {
      let finalTime = (Date.now() - startTime) / 1000;

      console.log(finalTime);
      clearInterval(gameTimerShow);
      const finalScore = {
        username: eventListener.target.username.value,
        time: finalTime
      };
      userFetchPost(finalScore);
      document.querySelector(".start-screen").style.display = "block";
      getScores();
    }
  }, 1000);
};

const bonk = e => {
  gameTimer = gameTimer + increaseTime;
  playSound();
  console.log("GUACACODER!!!!");
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

// function to POST username to the database

const userFetchPost = finalScore => {
  fetch("http://localhost:3000/scores", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      game_params: {
        user: { username: finalScore.username },

        score: { time: finalScore.time }
      }
    })
  })
    .then(resp => resp.json())
    .then(console.log());
};

const getScores = () => {
  return fetch("http://localhost:3000/scores/")
    .then(resp => resp.json())
    .then(scoreArray => {
      scoreIterator(scoreArray);
    });
};

const scoreIterator = scoreArray => {
  timeArray = scoreArray.map(score => score.time);
  // this method sorts the numbers into descending order, because javascript for SOME REASON doesn't like to just "sort" the numbers....
  sortedArray = timeArray.sort(function(a, b) {
    return b - a;
  });
  topTen = sortedArray.slice(0, 10);
  topTen.forEach(score => {
    renderScore(score);
  });
};

const renderScore = score => {
  const li = document.createElement("li");
  li.innerText = score;
  ol.appendChild(li);
  div.appendChild(ol);
  board.appendChild(div);
};

//create a timer on the event listner start.

coders.forEach(coder => {
  coder.addEventListener("click", bonk);
});

const startScreen = () => {
  document.querySelector(".start-screen");
};

inputField.addEventListener("click", e => {
  inputField.value = "";
});

usernameForm.addEventListener("submit", e => {
  e.preventDefault();
  document.querySelector(".start-screen").style.display = "none";

  eventListener = e;
  ol.innerHTML = "";
  // usernameForm.reset();

  start();
});

const playSound = () => {
  let sound = document.querySelector("audio");
  sound.play();
};
