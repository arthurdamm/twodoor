const matchAnswer = function(answer, card) {
  console.log("matchAnswer()", answer, card);
  const result = answer.match(card.regex) != null ? 1 : 0;
  card.performance.push(result);
  return result;
}

const selectNextCard = function(deck) {
  const getfailRate = performance => 1 - (performance.reduce((x, a) => x + a, 0) / performance.length);
  const failRateList = deck.map(card => getfailRate(card.performance) || 1);
  console.log("failRateList:", failRateList);
  const sumFails = failRateList.reduce((x, a) => x + a);
  console.log("sumFails:", sumFails);
  const randomBar = Math.random() * sumFails;
  console.log("randomBar:", randomBar);
  let i = 0;
  for (let subSumFails = 0; i < deck.length; i++)
    if ((subSumFails += failRateList[i]) >= randomBar) {
      console.log("subSumFails:", subSumFails);
      break;
    }
  console.log("i:", i, )
  return deck[i];
}
