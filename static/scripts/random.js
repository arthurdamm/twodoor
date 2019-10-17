$(function() {
  function removeNaN(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  function generatePair(){
    const name = ["agility", "altruism", "appeal", "beneficial", "bold", "creative", "capable", "dynamic", "drive", "empathy", "educate", "determination", "eager", "encourage", "fun", "helpful", "joy", "nice", "optimist", "polite", "quality", "reliable", "rockstar", "skilled", "spontaneous", "stellar", "teach", "tolerance", "value"]
    const color = ["#c0ffba", "#c8caca", "#ffb46c", "#ff756c", "#7FAAFF", "#909c79", "#ffffff"]
    console.log("name[0]: " + name[0]);
    console.log("color[0]: " + color[0]);
    var pair = removeNaN(name[getRandomInt(0, name.length - 1)]) + ' ' + removeNaN(color[getRandomInt(0, color.length - 1)]);
    console.log("pairing created: " + pair);
    return pair;
  }
  generatePair();
})
