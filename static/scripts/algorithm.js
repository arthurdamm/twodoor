/**
 * @fileoverview Module for Learning Algorithms
 * @package
 */

/**
 * The number of Leitner Boxes to use for partitioning the active deck.
 * @const {number} LEITNER_BOXES
 */
const LEITNER_BOXES = 5;
/**
 * The deck failure mean percentage at which new cards are released.
 * @const {number} LEITNER_BOXES
 */
const FAILURE_THRESHOLD = .25;
/**
 * The number of tries per card in active deck before new cards are released.
 * @const {number} LEITNER_BOXES
 */
const TRIES_THRESHOLD = 6.0;

/**
 * Matches user answer against regular expression on back of card.
 * @param {string} answer User answer given in text box.
 * @param {Object} card The card in question.
 * @return {number} A truth value between 1 (completely correct) and 0.
 */
const matchAnswer = function(answer, card) {
  const result = answer.match(card.regex) != null ? 1 : 0;
  card.performance.push(result);
  if (card.leitnerBox) {
    if (result) {
      if (card.leitnerBox < LEITNER_BOXES)
        ++card.leitnerBox;
    } else
      card.leitnerBox = 1;
  }
  return result;
}

/**
 * Selects next card in deck based on current algorithm.
 * @param {!Array<Object>} deck The deck to select from.
 * @param {Object} currentCard The current card for reference.
 * @return {Object} The newly selected card.
 */
const selectNextCard = function(deck, currentCard) {
  if (deck.length) {
    deck = staggerActiveDeck(deck);
    return selectNextCardLeitner(deck);
  }
}

/**
 * Selects next card in deck using statistical failure-based algorithm.
 * @param {Array<Object>} deck The deck to select from.
 * @return {Object} The newly selected card.
 */
const selectNextCardFailure = function(deck) {
  const sumFails = sum(getFailRates(deck));
  const randomBar = Math.random() * sumFails;
  let i = 0, subSumFails = 0
  for (; i < deck.length; i++)
    if ((subSumFails += failRateList[i]) >= randomBar)
      break;
  if (deck[i] == currentCard) i = ++i % deck.length;
  return deck[i];
}

/**
 * Selects next card in deck using Leitner System.
 * @param {!Array<Object>} deck The deck to select from.
 * @return {Object} The newly selected card.
 */
const selectNextCardLeitner = function(deck) {
  if (!deck.leitnerRound) deck.leitnerRound = 1;
  deck.forEach(card => card.leitnerBox === undefined && (card.leitnerBox = 1));
  console.log('selectNextCardLeitner()', deck);
  let currentDeck;
  /* Filter unplayed cards from active deck if their Leitner Box is a
     multiple of the current Leitner Round */
  do {
    currentDeck = deck.filter(card => card.active &&
      (deck.leitnerRound == 1 || deck.leitnerRound != card.leitnerBox)
      && !(deck.leitnerRound % card.leitnerBox) && !card.played);
    // If no cards filtered increment Leitner Round and try again */
    if (!currentDeck.length) {
      deck.leitnerRound++;
      deck.forEach(card => card.played = false);
    }
  } while (!currentDeck.length);
  const card = currentDeck[Math.floor(Math.random() * currentDeck.length)];
  card.played = true;
  card.last_played = deck.leitnerRound;
  return card;
}

/**
 * Staggers the current ActiveDeck by activating new cards as the failure
 * or tries thresholds are met.
 * @param {!Array<Object>} deck The active deck to stagger.
 * @return {!Array<Object>} The staggered active deck.
 */
const staggerActiveDeck = (deck) => {
  deck.tries ? deck.tries++ : deck.tries = 1;
  const activeDeck = deck.filter(card => card.active);
  let staggering = false;
  if (!activeDeck.length)
    staggering = true;
  if (getDeckFailRate(activeDeck) <= FAILURE_THRESHOLD)
    staggering = true;
  if (getDeckTries(deck, activeDeck) >= TRIES_THRESHOLD) {
    deck.tries = 1
    staggering = true;
  }
  if (staggering) {
    stagger = deck.stagger ? deck.stagger++ : (deck.stagger = 2, deck.stagger--);
    const passiveDeck = deck.filter(card => !card.active);
    let e;
    while (stagger-- > 0)
      if (e = popRandomElement(passiveDeck))
        e.active = 1;
  }
  console.log('ActiveDeck now:', deck.filter(card => card.active));
  return deck;
}

/**
 * Calculates the fail rate of the deck as the mean of the individual
 * cards' fail rates.
 * @param {!Array<Object>} deck The active deck.
 * @return {number} The deck fail rate.
 */
const getDeckFailRate = (deck) => {
  const failRates = getFailRates(deck);
  const deckFailRate = failRates.length ? sum(failRates) / failRates.length : 1;
  console.log('deckFailRate()', deckFailRate);
  return deckFailRate;  
}

/**
 * Calculates the fail rate of given card performance.
 * @param {Array<number>} performance The given card performance data.
 * @return {number} The card fail rate.
 */
const getFailRate = (performance) => !performance.length ? 1
    : 1 - (performance.reduce((a, x) => a + x, 0) / performance.length);

/**
 * Maps the fails rates of each card to the deck.
 * @param {!Array<Object>} deck The given deck to map.
 */
const getFailRates = (deck) => deck.map(card => getFailRate(card.performance));

/**
 * Calculates the mean tries rate of the deck.
 * @param {!Array<Object>} deck The given deck.
 * @param {Array<Object>} activeDeck ActiveDeck subset of given deck.
 * @return {number} The mean tries rate.
 */
const getDeckTries = (deck, activeDeck) => {
  const deckTries = deck.tries / activeDeck.length;
  console.log('getDeckTries()', deckTries);
  return deckTries;
}
