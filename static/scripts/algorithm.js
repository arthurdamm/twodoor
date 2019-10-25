const LEITNER_BOXES = 5;
const FAILURE_THRESHOLD = .25;
const TRIES_THRESHOLD = 7.0;

const matchAnswer = function(answer, card) {
  // console.log("matchAnswer()", answer, card);
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
  const sumFails = sum(getFailRates(deck));
  const randomBar = Math.random() * sumFails;
  let i = 0, subSumFails = 0
  for (; i < deck.length; i++)
    if ((subSumFails += failRateList[i]) >= randomBar)
      break;
  if (deck[i] == currentCard) i = ++i % deck.length;
  console.log("failRateList:", failRateList, "\nsumFails:", sumFails,
              "randomBar:", randomBar, "subSumFails:", subSumFails, "i:", i);
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
  // console.log("currentDeck:", currentDeck, "\ncard:", card);
  return card;
}

const staggerActiveDeck = (deck) => {
  console.log("staggerActiveDeck()", deck);
  deck.tries ? deck.tries++ : deck.tries = 1;
  const activeDeck = deck.filter(card => card.active);
  let staggering = false;
  if (!activeDeck.length) {
    console.log("ActiveDeck empty");
    staggering = true;
  }
  if (getDeckFailRate(activeDeck) <= FAILURE_THRESHOLD) {
    console.log("FAILURE_THRESHOLD met");
    staggering = true;
  }
  if (getDeckTries(deck, activeDeck) >= TRIES_THRESHOLD) {
    console.log("TRIES_THRESHOLD met")
    deck.tries = 1
    staggering = true;
  }
  if (staggering) {
    stagger = deck.stagger ? deck.stagger++ : deck.stagger = 1;
    console.log("staggering...", stagger);
    const passiveDeck = deck.filter(card => !card.active);
    let e;
    while (stagger-- > 0)
      if (e = popRandomElement(passiveDeck))
        e.active = 1;
  }
  console.log("activeDeck now:", deck.filter(card => card.active));
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
