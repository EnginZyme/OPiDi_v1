/**
 * A variable containing the representation of the sequences in a newly created protocol
 * @type {object}
 */
const defaultSequencesData = [];

/**
 * A getter that returns an object representation of a newly created sequence
 * @param {String} name - The name to be assigned to the created sequence
 * @param {Number} id - The unique ID to be assigned to the created sequence
 * @returns {object} - An object representation of a newly created sequence
 */
export function getNewSequence(name, id) {
  return {
    name,
    locations: [],
    id,
    locationCounter: 0,
  };
}

/**
 * A getter that returns an object representation of a newly created sequence location
 * @param {Number} id - The unique ID to be assigned to the created sequence location
 * @returns {object} - An object representation of a newly created sequence location
 */
export function getNewSequenceLocation(id) {
  return {
    slot_number: -1,
    slot_name: "",
    offset: {
      offset_type: "",
      value: 0,
    },
    wells: [],
    id,
  };
}

/**
 * A getter that returns an array representation of the sequences in a newly created protocol
 * @returns {object} - An array representation of the sequences in a newly created protocol
 * @see defaultSequencesData
 */
export function getDefaultSequencesData() {
  return defaultSequencesData;
}

/**
 * A getter that returns the length of an array representation of the sequences in a newly created protocol
 * @returns {object} - The length of an array representation of the sequences in a newly created protocol
 * @see defaultSequencesData
 */
export function getDefaultSequencesCount() {
  return defaultSequencesData.length;
}
