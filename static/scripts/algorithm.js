const matchAnswer = function(answer, card) {
  console.log("matchAnswer()", answer, card);
  const result = answer.match(card.regex) != null ? 1 : 0;
  card.performance.push(result);
  return result;
}

const selectNextCard = function(deck, currentCard) {
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

const LEITNER_BOXES = 5;

// Uses the Leitner System to select the next card
const selectNextCardLeitner = function(deck) {
  if (deck.leitnerRound === undefined)
    deck.leitnerRound = 1;
  deck.forEach(card => card.leitnerBox === undefined && (card.leitnerBox = 0));
  console.log("selectNextCardLeitner()", deck);
}
