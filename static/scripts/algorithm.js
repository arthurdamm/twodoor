const LEITNER_BOXES = 5;
const FAILURE_THRESHOLD = .25;
const TRIES_THRESHOLD = 6.0;

const matchAnswer = function(answer, card) {
  const result = answer.match(card.regex) != null ? 1 : 0;
  card.performance.push(result);
  if (card.leitnerBox)
    if (result) {
      if (card.leitnerBox < LEITNER_BOXES)
        ++card.leitnerBox;
    } else card.leitnerBox = 1;
  return result;
}

const selectNextCard = function(deck, currentCard) {
  deck = staggerActiveDeck(deck);
  return selectNextCardLeitner(deck);
}

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

const selectNextCardLeitner = function(deck) {
  if (!deck.leitnerRound) deck.leitnerRound = 1;
  deck.forEach(card => card.leitnerBox === undefined && (card.leitnerBox = 1));
  console.log("selectNextCardLeitner()", deck);
  let currentDeck;
  do {
    currentDeck = deck.filter(card => card.active &&
      (deck.leitnerRound == 1 || deck.leitnerRound != card.leitnerBox)
      && !(deck.leitnerRound % card.leitnerBox) && !card.played);
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
  console.log("ActiveDeck now:", deck.filter(card => card.active));
  return deck;
}

const getDeckFailRate = deck => {
  const failRates = getFailRates(deck);
  const deckFailRate = failRates.length ? sum(failRates) / failRates.length : 1;
  console.log("deckFailRate()", deckFailRate);
  return deckFailRate;  
}

const getFailRate = performance => !performance.length ? 1
    : 1 - (performance.reduce((a, x) => a + x, 0) / performance.length);

const getFailRates = deck => deck.map(card => getFailRate(card.performance));

const getDeckTries = (deck, activeDeck) => {
  const deckTries = deck.tries / activeDeck.length;
  console.log("getDeckTries()", deckTries);
  return deckTries;
}
