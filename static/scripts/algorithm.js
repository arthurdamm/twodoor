const LEITNER_BOXES = 5;

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
  return selectNextCardLeitner(deck);
  const getfailRate = performance => !performance.length ? 1
    : 1 - (performance.reduce((a, x) => a + x, 0) / performance.length);
  const failRateList = deck.map(card => getfailRate(card.performance));
  const sumFails = failRateList.reduce((a, x) => a + x);
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
    currentDeck = deck.filter(card =>
      (deck.leitnerRound == 1 || deck.leitnerRound != card.leitnerBox)
      && !(deck.leitnerRound % card.leitnerBox) && !card.played);
    console.log("currentDeck:", currentDeck);
    if (!currentDeck.length) {
      deck.leitnerRound++;
      deck.forEach(card => card.played = false);
    }
  } while (!currentDeck.length);
  const card = currentDeck[Math.floor(Math.random() * currentDeck.length)];
  card.played = true;
  card.last_played = deck.leitnerRound;
  console.log("final currentDeck:", currentDeck, "\ncard:", card);
  return card;
}
