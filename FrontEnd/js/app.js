const desks = document.querySelectorAll(".desk"); 
const coders = document.querySelectorAll(".coder"); 
const btnStart = document.querySelector("#button"); 
const usernameForm = document.querySelector("#usernameForm"); 
btnStart.className = "btnStr"; 

// const startScreen = document.querySelector(".start-screen");
const showScore = document.querySelector(".show-score"); 
let currentScore = document.querySelector(".class"); 
let splashScreen = document.querySelector(".splash-screen"); 
let eventListener = null

let score = 0; 
let lastDesk; 
let timeUp = false; 
let increaseTime = 1;

let gameTimer = 2; 

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

  gameTimer = 7; 
  timeUp = false; 
  peep(); 

  timerStarting() 
}; 

let timerStarting = () => { 
  display = document.querySelector("#time"); 
  let startTime = Date.now(); 
  startTimer(display, startTime ); 
}; 

const startTimer = (display, startTime ) => { 
  
  const gameTimerShow = setInterval(function() {
    display.textContent = `${gameTimer}`;
    gameTimer = --gameTimer;
    startTime;
    if (gameTimer < 0) {
      let finalTime = (Date.now() - startTime)/1000; //we will pass final time to the post function.
      console.log(finalTime);
      clearInterval(gameTimerShow);
      const finalScore = {username: eventListener.target.username.value, time: finalTime}
      userFetchPost(finalScore);
      getScores();
    }
    
    // scoreFetchPost(finalScore)
   
    
  }, 1000);
};

// let finalTime = Date.now();

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

// k

// function to POST username to the database
// function postData(url = 'http://localhost:3000/users', data = {}) {
const userFetchPost = (finalScore) => {
  // debugger
  fetch("http://localhost:3000/scores", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({game_params: {
      user: {username: finalScore.username},
      score: {time: finalScore.time} //input info
        }})
  })
    .then(resp => resp.json())
    .then(console.log());
};


const getScores = () => {
  return fetch("http://localhost:3000/scores/")
    .then(resp => resp.json())
    .then(scoreArray =>{
      scoreIterator(scoreArray);
    })
};

const scoreIterator = scoreArray => {
  debugger
   sortedArray = scoreArray.map(score => score.time);
   sortedArray.forEach(score => {
     renderScores(score)
   })
  // let sortedScores = scoreArray.sort()
  // sortedScores.forEach(score => {
  //   renderScores(score)
  // });
}

const board = document.querySelector("#leaderboard")

const renderScores = (score) => {
  // const tableScore = document.querySelector("#score")
  // const scoreRow = document.createElement("tr")
  // const tableUser = document.createElement("td")
  // const tableTime = document.createElement("td")
  const div = document.createElement("div")
  const ul = document.createElement("ul")
  const li = document.createElement("li")

  li.innerText = score
  ul.appendChild(li)
  div.appendChild(ul)
  board.appendChild(div)
}




// tableUser.innerText = score.user_id;
// tableTime.innerText = score.time;

// scoreRow.append(tableUser, tableTime)
// tableScore.append(scoreRow)
// startTimer(score)
 

// function to POST score with associated user_id to the database
// const scoreFetchPost = score => {
//   fetch("http://localhost:3000/scores", {
//     method: "POST",
//     headers: {
//       "Content-Type": "aplication/json"
//     },
//     body: JSON.stringify({
//       user_id: `${current_user.id}`, //params info
//       time: `${score}`
//     })
//   });
// };

//create a timer on the event listner start.

coders.forEach(coder => {
  coder.addEventListener("click", bonk);
});

const startScreen = () => {
  document.querySelector(".start-screen");
};

usernameForm.addEventListener("submit", e => {
 
  e.preventDefault();
  document.querySelector(".start-screen").style.display = "none";
  
  eventListener = e
  usernameForm.reset()
  start();
  // end();
  // startScreen.hide();
  // splashScreen.hide();
}); // here I have to add the timer start

//timer does not need to be on the page

// COMMENT FOR AARON:
// time/score thing
// create a variable "totalScore" starting with 10, increments when you whack a coder
// when timer hits 0. show 'You lasted  "totalScore" seconds!' in score board
