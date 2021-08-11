/**
 * 
 * @param {String} name - The name to be assigned to the created liquid class
 * @param {Number} id - A unique ID to be assigned to the created liquid class
 * @returns {object} - An object representing the created liquid class
 */
export function getNewLiquidClass(name, id) {
  return {
    name,
    id,
    liquid_config_object: {
      touch_tip: false,
      blow_out: true,
      blowout_location: "destination well",
      carryover: true,
      air_gap: 0,
      mix_before: {
        repetitions: 0,
        volume: 0,
      },
      mix_after: {
        repetitions: 0,
        volume: 0,
      },
      aspirate_rate: 1,
      dispense_rate: 1,
      blow_out_rate: 1,
    },
  }
}

/**
 * The default liquid class(es) accessible in a newly created protocol
 * @type {array}
 */
const defaultLiquidClassesData = [
  getNewLiquidClass("Default", 0),
];

/**
 * A getter to return the default liquid class(es) accessible in a newly created protocol
 * @see {@link defaultLiquidClassesData}
 * @returns {object} - The default liquid class(es) accessible in a newly created protocol
 */
export function getDefaultLiquidClassesData() {
  return defaultLiquidClassesData;
}

/**
 * A getter to returen the number of the default liquid class(es) accessible in a newly created protocol
 * @see {@link defaultLiquidClassesData}
 * @returns {number} - The number of the default liquid class(es) accessible in a newly created protocol
 */
export function getDefaultLiquidClassesCount() {
  return defaultLiquidClassesData.length;
}
