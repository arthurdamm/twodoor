const answerMatches = function(answer, door) {
  console.log("answerMatches()", answer, door, door.regex);
  return answer.match(door.regex);
}
