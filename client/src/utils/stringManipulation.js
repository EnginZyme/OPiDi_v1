/**
 * Identifies and returns all numbers within the input string in an array
 * @param {String} string - The input string from with the array of numbers is to be extracted
 * @returns {Array.<Number>} - An array of numbers extracted from the input string
 */
export function getFloatArrayFromString(string) {
  const regex = /[+-]?\d+(\.\d+)?/g;
  return string.match(regex).map((item) => parseFloat(item));
}
