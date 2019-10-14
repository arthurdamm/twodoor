const matchAnswer = function(answer, card) {
  console.log("matchAnswer()", answer, card);
  const result = answer.match(card.regex) != null ? 1 : 0;
  card.performance.push(result);
  return result;
}
