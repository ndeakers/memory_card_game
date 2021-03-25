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

// button shuffles the cards classes and unflips cards. resets matched array
function resetButton(array) {
  let button = document.querySelector('button');
  button.addEventListener('click', function () {
    let shuffled = shuffle(COLORS);
    count = 0;
    document.querySelector('#flip').innerHTML = 'Flips: 0'
    for (let i = 0; i < array.length; i++) {
      unFlipCard(array[i]);
      array[i].className = shuffled[i];
      matched = [];
    }
  })

}

function flipCounter() {
  let counter = document.querySelector('#flip');
  count++;
  counter.innerHTML = "Flips: " + count;
}

let count = 0;
let hasChosenCard = false;
let firstCard;
let firstCardClass;
let secondCard;
let secondCardClass;
let lock = false;
let matched = [];

function handleCardClick(evt) {
  // don't fire if clicking game div, clicking a matched pair, or the reset button
  if (lock || evt.target.className === 'game' || matched.includes(evt.target) || evt.target.className === 'reset') {
    return;
  }
  // if clicking on a valid card
  if (COLORS.includes(evt.target.className)) {
    flipCard(evt.target);
    flipCounter();
    // if click on two diff cards and color is the same stay face up
    if (!hasChosenCard) {
      assignFirstCard(evt);
    } else {
      assignSecondCard(evt);
      // if double click same card. unflip the card
      if (firstCard.target === secondCard.target) {
        unFlipCard(secondCard.target);
        // if the classes match, change background colors to match class
      } else if (firstCardClass === secondCardClass) {
        flipCard(firstCard.target);
        flipCounter(secondCard.target);
        matched.push(firstCard.target, secondCard.target);
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
}


