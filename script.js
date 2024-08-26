let user_score = 0;
let computer_score = 0;
let user_hand;
let computer_hand;
let round_result;

const user_output = document.getElementById("user_score");
const computer_output = document.getElementById("computer_score");

const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissors = document.getElementById("scissors");
const result = document.querySelector(".result");
const score_board = document.querySelector(".score_board");

let isWaiting = false;
const delay = 1000;

function computer_choice() {
  let random_num = Math.floor(Math.random() * 3);

  if (random_num === 0) {
    computer_hand = "rock";
  } else if (random_num === 1) {
    computer_hand = "paper";
  } else {
    computer_hand = "scissors";
  }
}

function calculate_result() {
  if (
    (user_hand === "rock" && computer_hand === "scissors") ||
    (user_hand === "paper" && computer_hand === "rock") ||
    (user_hand === "scissors" && computer_hand === "paper")
  ) {
    user_score++;
    user_output.innerHTML = user_score;
    result.innerHTML =
      user_hand +
      "<sup>(You)</sup>   Beats   " +
      computer_hand +
      "<sup>(Computer)</sup>";

    round_result = "win";
  } else if (
    (computer_hand === "rock" && user_hand === "scissors") ||
    (computer_hand === "paper" && user_hand === "rock") ||
    (computer_hand === "scissors" && user_hand === "paper")
  ) {
    computer_score++;
    computer_output.innerHTML = computer_score;
    result.innerHTML =
      computer_hand +
      "<sup>(Computer)</sup>   Beats   " +
      user_hand +
      "<sup>(You)</sup>";

    round_result = "lose";
  } else {
    result.innerHTML = "Draw";
    round_result = "Draw!";
  }
}

function playSound(soundId) {
  const sound = document.getElementById(soundId);
  sound.pause();
  sound.currentTime = 0;
  sound.play();
}

function change_color() {
  if (round_result === "win") {
    score_board.style.animation = "flash-green 1s ease";
    playSound("win-sound");
  } else if (round_result === "lose") {
    score_board.style.animation = "flash-red 1s ease, shake 0.5s ease";
    playSound("lose-sound");
  } else {
    score_board.style.animation = "flash-blue 1s ease";
    playSound("lose-sound");
  }

  setTimeout(() => {
    score_board.style.animation = "none";
  }, 1000);
}

function handleChoice(choice) {
  if (isWaiting) return;

  isWaiting = true;
  const buttons = document.querySelectorAll(".choice img");
  buttons.forEach((button) => button.classList.add("disabled"));

  computer_choice();
  user_hand = choice;
  calculate_result();
  change_color();

  setTimeout(() => {
    isWaiting = false;
    buttons.forEach((button) => button.classList.remove("disabled"));
  }, delay);
}

rock.addEventListener("click", function () {
  handleChoice("rock");
});

paper.addEventListener("click", function () {
  handleChoice("paper");
});

scissors.addEventListener("click", function () {
  handleChoice("scissors");
});

document.addEventListener("DOMContentLoaded", function () {
  document.body.classList.add("fade-in");
});

document.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = this.href;

    document.body.classList.remove("fade-in");
    document.body.classList.add("fade-out");

    setTimeout(function () {
      window.location.href = href;
    }, 500);
  });
});
