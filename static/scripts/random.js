/**
 * @fileoverview Module for functions related to random selection.
 * @package
 */

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

const timestamp = () => parseInt(new Date().getTime() / 1000);

async function sha256(message) {
  const msgUint8 = new TextEncoder().encode(message);                           // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);           // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
  return hashHex;
}

function isDescendant(parent, child) {
  let node = child.parentNode;
  while (node != null) {
    if (node == parent) {
       return true;
    }
    node = node.parentNode;
  }
  return false;
}
