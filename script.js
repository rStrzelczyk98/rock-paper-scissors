"use strict";
const rules = document.querySelector(".btn-rules");
const main = document.querySelector(".content-grid");
const buttons = document.querySelector(".game-buttons");
const buttonsBonus = document.querySelector(".game-buttons-bonus");
const toggle = document.querySelector(".toggle");
let userPick, computer, score;
let bonus = false;

window.addEventListener("load", loadGame);
toggle.addEventListener("click", switchGames);
rules.addEventListener("click", showRules);
buttons.addEventListener("click", (e) => play(e));
buttonsBonus.addEventListener("click", (e) => play(e));

function showRules() {
  const active = toggle.classList.contains("active") ? "active" : "";
  const modal = `<div class="modal goUp">
  <div class="rules ${active}">
      <h2>rules</h2>
      <button class="close" onclick="closeRules()"></button>
      </div>
    </div>`;
  document.body.insertAdjacentHTML("beforeend", modal);
}

function closeRules() {
  document.querySelector(".modal").remove();
}

function displayResults() {
  overflow("hidden");
  hideToggle();
  const winner = toggle.classList.contains("active") ? results(5) : results(3);
  const html = ` <div class="results ${bonus ? "bonus" : ""}">
        <div class=" player btn btn-${userPick} fromLeft"></div>
        <div class=" computer btn fromRight"></div>
        <div>
         <p class="fromLeft delay-1">${winner}</p>
         <button class="btn-again fromRight delay-2" onclick="playAgain()"></button>
        </div>
      </div>`;
  toggleButtons();
  main.insertAdjacentHTML("afterbegin", html);
  setTimeout(() => update(computer, winner), 750);
}

function results(value) {
  computer = computerPick(value);
  if (+userPick === computer) return "Draw";
  if (
    +userPick - computer === -3 ||
    +userPick - computer === -1 ||
    +userPick - computer === 2 ||
    +userPick - computer === 4
  )
    return "You Win";
  else return "You Lose";
}

function computerPick(value) {
  return Number(Math.floor(Math.random() * value + 1));
}

function update(num, winner) {
  const container = document.querySelector(".results");
  const landscape =
    matchMedia && matchMedia("(orientation: landscape)").matches;
  const index = checkWinner(winner);
  container.children[1].classList.add(`btn-${num}`);
  overflow();
  if (index && landscape) container.children[index].classList.add(`shadow-2`);
  if (index && !landscape) container.children[index].classList.add(`shadow-1`);
  if (index == 1) navigator.vibrate([200]);
  setTimeout(() => updateScore(winner), 500);
}

function playAgain() {
  document.querySelector(".results").remove();
  hideToggle();
  toggleButtons();
}

function checkWinner(value) {
  if (value.toLowerCase() == "you win") return "0";
  else if (value.toLowerCase() == "you lose") return "1";
  else return false;
}

function overflow(value = "unset") {
  main.style.overflowX = value;
}

function hideToggle() {
  toggle.classList.toggle("hidden");
}

function toggleButtons() {
  toggle.classList.contains("active")
    ? buttonsBonus.classList.toggle("hidden")
    : buttons.classList.toggle("hidden");
}

function loadGame() {
  document.body.classList.add("hidden");
  score = localStorage.getItem("score")
    ? JSON.parse(localStorage.getItem("score"))
    : "00";
  displayScore(score);
  document.body.classList.remove("hidden");
}

function displayScore(value) {
  document.getElementById("score").textContent = value;
}

function updateScore(value) {
  if (value == "You Win") score++;
  if (value == "You Lose" && score > 0) score--;
  localStorage.setItem("score", score);
  displayScore(score);
}

function switchGames() {
  const title = document.getElementsByTagName("h1")[0];
  title.innerHTML = toggle.classList.toggle("active")
    ? `<span>rock</span><span>paper</span><span>scissors</span><span>lizard</span><span>spock</span>`
    : `<span>rock</span><span>paper</span><span>scissors</span>`;
  bonus = toggle.classList.contains("active");
  buttonsBonus.classList.toggle("hidden");
  buttons.classList.toggle("hidden");
}

function play(event) {
  if (!event.target.closest(".btn")) return;
  userPick = event.target.getAttribute("data-value");
  displayResults();
}
