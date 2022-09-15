const input = document.getElementById("input");
const message = document.getElementById("message");
const getNumberButton = document.querySelector(".get-number-button");
const testNumberButton = document.querySelector(".test-number-button");

getNumberButton.addEventListener("click", playAudio);
testNumberButton.addEventListener("click", testNumber);

let value;
const range = getRange(9, 11);
const usedIndices = [];

getNumber();

function getRange(size, startAt = 0) {
  return [...Array(size).keys()].map((i) => i + startAt);
}

function getRandomNumber(range) {
  if (usedIndices.length >= range.length) {
    return;
  }
  let index;

  while (true) {
    index = Math.floor(Math.random() * range.length);
    if (!usedIndices.includes(index)) {
      break;
    }
  }
  usedIndices.push(index);
  return range[index];
}

function getNumber() {
  value = getRandomNumber(range);

  if (!value) {
    message.innerHTML = "Der er ikke flere tal tilbage!";
    return;
  }

  playAudio();
}

function playAudio() {
  if (!value) {
    return;
  }
  const audio = new Audio(`./assets/${value}.mp3`);
  audio.play();
}

function testNumber() {
  const inputValue = input.value;

  if (!inputValue) {
    message.innerHTML = "Indtast et tal mellem 11 og 19!";
    return;
  }

  if (inputValue == value) {
    message.innerHTML = "Korrekt! Tillykke!";
    setTimeout(() => (message.innerHTML = "Ny test om.."), 1500);
    setTimeout(() => (message.innerHTML = "5.."), 2500);
    setTimeout(() => (message.innerHTML = "4.."), 3500);
    setTimeout(() => (message.innerHTML = "3.."), 4500);
    setTimeout(() => (message.innerHTML = "2.."), 5500);
    setTimeout(() => (message.innerHTML = "1.."), 6500);
    setTimeout(() => {
      message.innerHTML = "";
      getNumber();
    }, 7500);
  } else {
    message.innerHTML = "Forkert! Prøv igen!";
  }
}
