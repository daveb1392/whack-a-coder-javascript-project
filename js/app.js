const holes = document.querySelectorAll(".hole");
const moles = document.querySelectorAll(".mole");
const btnStart = document.querySelector("button");

const startScreen = document.querySelector(".start-screen");
const showScore = document.querySelector(".show-score");

let score = 0;
let lastHole;
let timeUp = false;

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
  const time = randomTime(400, 1000);
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
  startScreen.classList.add("hide");

  peep();

  setTimeout(() => {
    timeUp = true;
    startScreen.classList.remove("hide");

    if (score > 0) {
      showScore.classList.add("show");
      const message = "Your score: " + score + (score >= 10 ? " GREAT!" : "");
      showScore.textContent = message;
    }
  }, 10000);
}

const bonk = (e) => {
  if (!timeUp) {
    // scoreBoard.classList.add("add");
    score++;
    // scoreBoard.textContent = score;
  }
}

moles.forEach(mole => {
  mole.addEventListener("click", bonk);
});

btnStart.addEventListener("click", start);
