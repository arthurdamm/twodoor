/**
 * Pops random element from array.
 * @param {Array<*>} array A given array of unknown type.
 * @return {*} The popped element.
*/
const popRandomElement = (array) => {
  const element = getRandomElement(array);
  array.splice(array.indexOf(element), 1);
  return element;
}

/**
 * Gets random element from array.
 * @param {Array<*>} array A given array of unknown type.
 * @return {*} The random element.
 */
const getRandomElement = (array) =>
  array[Math.floor(Math.random() * array.length)];

/**
 * Selects a random number between given min and max.
 * @param {number} min The given minimum.
 * @param {number} max The given maximum.
 * @return {number} A random number between min and max.
 */
const getRandom = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;

/**
 * Sums the elements of an array.
 * @param {Array<number>} list The array to sum.
 * @return {number} The sum.
 */
const sum = (list) => list.reduce((a, x) => a + x, 0);
