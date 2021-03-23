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

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - an click listener for each card to handleCardClick
 */

function createCards(colors) {
  const gameBoard = document.getElementById("game");

  for (let color of colors) {
    let card = document.createElement('div');
    card.className = color;
    card.style.backgroundColor = 'white';
    gameBoard.appendChild(card);
    document.addEventListener('click', handleCardClick);
  }
};

/** Flip a card face-up. */
function flipCard(card) {
  card.style.backgroundColor = card.classList;
  return card;
}

/** Flip a card face-down. */

function unFlipCard(card) {
  if (COLORS.includes(card.className)) {
    card.style.backgroundColor = 'white';
    return card;
  }
}

/** Handle clicking on a card: this could be first-card or second-card. */


let hasChosenCard = false;
let firstCard;
let firstCardClass;
let secondCard;
let secondCardClass;
let lock = false;

function handleCardClick(evt) {
  if (lock) {
    console.log('locked')
    return;
  }
  if (evt.target.className === 'game') {
    return;
  }
  flipCard(evt.target);

  // if click on two diff cards and color is the same stay face up
  if (hasChosenCard === false) {
    hasChosenCard = true;
    firstCard = evt;
    firstCardClass = evt.target.className;
    console.log(hasChosenCard, 'firstCard is ' + firstCardClass);
  } else {
    hasChosenCard = false;
    secondCard = evt;
    secondCardClass = evt.target.className;
    console.log(hasChosenCard, 'secondCard is ' + secondCardClass);

    if (firstCard.target === secondCard.target) {
      unFlipCard(firstCard.target);
      unFlipCard(secondCard.target);
    } else if (firstCardClass === secondCardClass) {
      firstCard.backgroundColor = firstCardClass;
      secondCard.backgroundColor = secondCardClass;
    } else if (firstCard.target !== secondCard.target) {
      lock = true;
      setTimeout(function () {
        unFlipCard(firstCard.target);
        unFlipCard(secondCard.target);
        lock = false;
      }, 1000);
    }

  }
}
// if not flip card back down. use set timeout so they stay up for at least 1 second
// only click two cards at a time
// }
function resetButton() {
  let button = document.querySelector('button');
  button.addEventListener('click', function () {
    document.querySelector('#game').reset();
  })
}
