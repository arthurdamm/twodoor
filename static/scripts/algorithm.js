const LEITNER_BOXES = 5;
const FAILURE_THRESHOLD = .25;
const TRIES_THRESHOLD = 6.0;

const matchAnswer = function(answer, card) {
  console.log("matchAnswer()", answer, card);
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
  deck.tries ? deck.tries++ : deck.tries = 1;
  deck = staggerActiveDeck(deck);
  return selectNextCardLeitner(deck);
  const sumFails = sum(failRateList(deck));
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
  console.log("currentDeck:", currentDeck, "\ncard:", card);
  return card;
}

const staggerActiveDeck = (deck) => {
  console.log("staggerActiveDeck()", deck);
  const activeDeck = deck.filter(card => card.active);
  if (!activeDeck.length || getDeckFailRate(activeDeck) <= FAILURE_THRESHOLD
    || (deck.tries / activeDeck.length >= TRIES_THRESHOLD && (deck.tries = 1))) {
    console.log("staggering...");
    let stagger = deck.stagger ? deck.stagger++ : deck.stagger = 1;
    const passiveDeck = deck.filter(card => !card.active);
    while (stagger-- > 0)
      popRandomElement(passiveDeck).active = 1;
  }
  console.log("activeDeck now:", deck.filter(card => card.active));
  return deck;
}

const getDeckFailRate = deck => {
  const list = failRateList(deck);
  const deckFailureRate = list.length ? sum(list) / list.length : 1;
  console.log("deckFailureRate()", deckFailureRate);
  return deckFailureRate;  
}

const getFailRate = performance => !performance.length ? 1
    : 1 - (performance.reduce((a, x) => a + x, 0) / performance.length);

const failRateList = deck => deck.map(card => getFailRate(card.performance));
