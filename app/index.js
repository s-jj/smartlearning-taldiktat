const input = document.getElementById("input");
const message = document.getElementById("message");
const getNumberButton = document.querySelector(".get-number-button");
const testNumberButton = document.querySelector(".test-number-button");

getNumberButton.addEventListener("click", playAudio);
testNumberButton.addEventListener("click", testNumber);
input.addEventListener("keypress", e => {
  if (e.key == "Enter"){
    testNumber();
  }
});

let value;
let currentIndex = 0;

const range = getRange(9, 11);

const shuffledRange = range
  .map((x) => ({ x, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ x }) => x);

console.log(shuffledRange);

getNumber();

function getNumber() {
  value = getNextValue();
  console.log(value);
  if (!value) {
    message.innerHTML = "Der er ikke flere tal tilbage!";
    return;
  }

  playAudio();
}

function getRange(size, startAt = 0) {
  return [...Array(size).keys()].map((i) => i + startAt);
}

function getNextValue() {
  if (currentIndex == range.length) {
    return;
  }

  const newValue = shuffledRange[currentIndex];
  currentIndex++;
  return newValue;
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
    message.innerHTML = `Indtast et tal mellem ${range[0]} og ${range[range.length-1]}!`;
    return;
  }

  if (inputValue == value) {
    if (currentIndex == range.length) {
      message.innerHTML = "Tillykke! Du skrev alle tal rigtigt!";
      return;
    }

    message.innerHTML = "Korrekt!";
    startNextTest();
  } else {
    message.innerHTML = "Forkert! Prøv igen!";
  }
}

function startNextTest() {
  setTimeout(() => (message.innerHTML = "Ny test om.."), 1000);
  setTimeout(() => (message.innerHTML = "5.."), 2000);
  setTimeout(() => (message.innerHTML = "4.."), 3000);
  setTimeout(() => (message.innerHTML = "3.."), 4000);
  setTimeout(() => (message.innerHTML = "2.."), 5000);
  setTimeout(() => (message.innerHTML = "1.."), 6000);
  setTimeout(() => {
    message.innerHTML = "";
    getNumber();
  }, 7000);
}
