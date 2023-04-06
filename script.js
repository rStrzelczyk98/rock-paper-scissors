"use strict";

const rules = document.querySelector(".btn-rules");
const main = document.querySelector(".content-grid");
const buttons = document.querySelector(".game-buttons");
let userPick, computer;
let score;

window.addEventListener("load", getScore);
rules.addEventListener("click", showRules);
buttons.addEventListener("click", function (e) {
  if (!e.target.closest(".btn")) return;
  userPick = e.target.getAttribute("data-value");
  displayResults();
});

// RULES
function showRules() {
  const modal = `<div class="modal goUp">
  <div class="rules">
      <h2>rules</h2>
      <button class="close" onclick="closeRules()"></button>
      </div>
    </div>`;
  document.body.insertAdjacentHTML("beforeend", modal);
}
function closeRules() {
  const modal = document.querySelector(".modal");
  modal.remove();
}
function computerPick() {
  return Number(Math.floor(Math.random() * 3 + 1));
}
function results() {
  computer = computerPick();
  if (+userPick == computer) return "Draw";
  if (+userPick + 2 == computer) return "You Win";
  if (+userPick - 2 == computer) return "You Lose";
  if (+userPick > computer) return "You Win";
  if (+userPick < computer) return "You Lose";
}
// RESULTS
function displayResults() {
  const winner = results();
  const result = ` <div class="results">
        <div class="btn btn-${userPick} fromLeft"></div>
        <div class="btn fromRight"></div>
        <div>
         <p class="fromLeft delay-1">${winner}</p>
         <button class="btn-again fromRight delay-2" onclick="playAgain()"></button>
        </div>
      </div>`;
  buttons.classList.add("hidden");
  main.insertAdjacentHTML("afterbegin", result);
  setTimeout(() => wait(computer, winner), 750);
}

function playAgain() {
  const results = document.querySelector(".results");
  results.remove();
  buttons.classList.remove("hidden");
}

function wait(a, b) {
  const results = document.querySelector(".results");
  if (matchMedia && matchMedia("(orientation: landscape)").matches) {
    results.children[0].classList.add(`shadow-2`);
  } else {
    results.children[0].classList.add(`shadow-1`);
  }
  results.children[1].classList.add(`btn-${a}`);
  setTimeout(() => updateScore(b), 500);
}

function displayScore(value) {
  const output = document.getElementById("score");
  output.textContent = value;
}

function getScore() {
  if (localStorage.getItem("score")) {
    score = JSON.parse(localStorage.getItem("score"));
  } else {
    score = "00";
  }
  displayScore(score);
}

function updateScore(value) {
  if (value == "You Win") {
    score++;
  }
  if (value == "You Lose" && score > 0) {
    score--;
  }
  localStorage.setItem("score", score);
  displayScore(score);
}
