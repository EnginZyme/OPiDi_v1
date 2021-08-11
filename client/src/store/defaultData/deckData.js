/**
 * The default specification for a deck
 * @type {object}
 */
const defaultDeckData = {
  left_pipette: {
    pipette: {},
    tipracks: [],
  },
  right_pipette: {
    pipette: {},
    tipracks: [],
  },
  slots: {
    1: {},
    2: {},
    3: {},
    4: {},
    5: {},
    6: {},
    7: {},
    8: {},
    9: {},
    10: {},
    11: {},
    12: {},
  },
};

/**
 * A getter to return the default specification of a deck
 * @see defaultDeckData
 * @returns {object} - The default specification of a deck
 */
export function getDefaultDeckData() {
  return defaultDeckData;
}
