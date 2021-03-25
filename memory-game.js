// "use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];


const colors = shuffle(COLORS);

createCards(colors);


/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

function createCards(colors) {
  const gameBoard = document.getElementById("game");
  let card;
  let cards = [];
  for (let color of colors) {
    card = document.createElement('div');
    cards.push(card);
    card.className = color;
    card.style.backgroundColor = 'white';
    gameBoard.appendChild(card);
    document.addEventListener('click', handleCardClick);
  }
  resetButton(cards);
};

/** Flip a card face-up. */
function flipCard(card) {
  card.style.backgroundColor = card.className;
  return card;
}

/** Flip a card face-down. */

function unFlipCard(card) {
  if (COLORS.includes(card.className)) {
    card.style.backgroundColor = 'white';
    return card;
  }
}
// assigns first card
function assignFirstCard(evt) {
  if (COLORS.includes(evt.target.className)) {
    hasChosenCard = true;
    firstCard = evt;
    firstCardClass = evt.target.className;
  }
}
// assigns second cad and 
function assignSecondCard(evt) {
  if (COLORS.includes(evt.target.className)) {
    hasChosenCard = false;
    secondCard = evt;
    secondCardClass = evt.target.className;
  }
}


let hasChosenCard = false;
let firstCard;
let firstCardClass;
let secondCard;
let secondCardClass;
let lock = false;

function handleCardClick(evt) {
  if (lock || evt.target.className === 'game') {
    return;
  }
  flipCard(evt.target);

  // if click on two diff cards and color is the same stay face up
  if (!hasChosenCard) {
    assignFirstCard(evt);
  } else {
    assignSecondCard(evt);
    // if double click same card. unflip the card
    if (firstCard.target === secondCard.target) {
      unFlipCard(firstCard.target);
      unFlipCard(secondCard.target);
      // if the classes match, change background colors to match class
    } else if (firstCardClass === secondCardClass) {
      firstCard.target.backgroundColor = firstCardClass;
      secondCard.target.backgroundColor = secondCardClass;
      // if not a match, lock the game board so more clicks can't happen and unflip card after 1 sec
    } else {
      lock = true;
      setTimeout(function () {
        unFlipCard(firstCard.target);
        unFlipCard(secondCard.target);
        lock = false;
      }, 1000);
    }
  }
}

function resetButton(array) {
  let button = document.querySelector('button');
  button.addEventListener('click', function () {
    let shuffled = shuffle(COLORS);
    for (let i = 0; i < array.length; i++) {
      array[i].style.backgroundColor = 'white';
      array[i].className = shuffled[i];
    }
  })
}
