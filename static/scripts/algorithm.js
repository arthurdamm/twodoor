const matchAnswer = function(answer, card) {
  console.log("matchAnswer()", answer, card);
  const result = answer.match(card.regex) != null ? 1 : 0;
  card.performance.push(result);
  return result;
}

const selectNextCard = function(deck) {
  const getfailRate = performance => !performance.length ? 1 :
    1 - (performance.reduce((x, a) => x + a, 0) / performance.length);
  const failRateList = deck.map(card => getfailRate(card.performance));
  const sumFails = failRateList.reduce((x, a) => x + a);
  const randomBar = Math.random() * sumFails;
  let i = 0;
  for (let subSumFails = 0; i < deck.length; i++)
    if ((subSumFails += failRateList[i]) >= randomBar) {
      console.log("subSumFails:", subSumFails);
      break;
    }
  console.log("failRateList:", failRateList);
  console.log("sumFails:", sumFails);
  console.log("randomBar:", randomBar);
  console.log("i:", i, )
  return deck[i];
}
