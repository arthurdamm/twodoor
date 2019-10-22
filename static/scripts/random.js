const popRandomElement = (array) => {
  const element = getRandomElement(array);
  array.splice(array.indexOf(element), 1);
  return element;
}

const getRandomElement = (array) =>
  array[Math.floor(Math.random() * array.length)];

const getRandom = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;

const removeNaN = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

const sum = (list) => list.reduce((a, x) => a + x, 0);
