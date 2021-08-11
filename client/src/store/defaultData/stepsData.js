/**
 * A variable that stores an array representation of the steps in a newly created protocol
 * @type {array}
 */
const defaultStepsData = [];

/**
 * A getter that returns an object representation of a newly created array transfer step
 * @param {Number} id - A unique ID (within the scope of steps) to be assigned to the newly created step
 * @returns {object} - An object representation of a newly created array transfer step
 */
export function getNewArrayTransferStep(id) {
  return {
    type: "array_transfer",
    name: `Array Transfer (${id})`,
    id,
    substeps: [],
    parameters: {
      pipette: "",
      pipette_obj: {},
      pipette_strategy: "",
      array_map_filename: "",
      source_var_map: {},
      destination_var_map: {},
      hasMapConflict: true,
      mappingComplete: false,
      array_map: [],
      liquidClass: "Default",
      liquidClassId: 0,
      tipsStrategy: "STANDARD",
      offset: {
        source: 1,
        destination: 1,
        source_type: "Bottom",
        destination_type: "Bottom",
      },
    },
  };
}

/**
 * A getter that returns an object representation of a newly created bioshake step
 * @param {Number} id - A unique ID (within the scope of steps) to be assigned to the newly created step
 * @returns {object} - An object representation of a newly created bioshake step
 */
export function getNewBioshakeStep(id) {
  return {
    type: "bioshake_3000t",
    name: `Bioshake 3000T (${id})`,
    id,
    substeps: [],
    parameters: {
      speed: 0,
      setpoint: 0,
      tempControl: false,
      cooldown: false,
      duration: 0,
      wait_for_stop: true,
      force_stop: false,
    },
  };
}

/**
 * A getter that returns an object representation of a newly created loop step
 * @param {Number} id - A unique ID (within the scope of steps) to be assigned to the newly created step
 * @returns {object} - An object representation of a newly created loop step
 */
export function getNewLoopStep(id) {
  return {
    type: "loop",
    name: `Loop (${id})`,
    id,
    num_iterations: 0,
    substeps: [],
  };
}

/**
 * A getter that returns an object representation of a newly created pause step
 * @param {Number} id - A unique ID (within the scope of steps) to be assigned to the newly created step
 * @returns {object} - An object representation of a newly created pause step
 */
export function getNewPauseStep(id) {
  return {
    type: "pause",
    name: `Pause (${id})`,
    id,
    substeps: [],
    auto_resume: false,
    pause_time: 0,
  };
}

/**
 * A getter that returns an object representation of a newly created sequence transfer step
 * @param {Number} id - A unique ID (within the scope of steps) to be assigned to the newly created step
 * @returns {object} - An object representation of a newly created sequence transfer step
 */
export function getNewSequenceTransferStep(id) {
  return {
    type: "sequence_transfer",
    name: `Sequence Transfer (${id})`,
    id,
    substeps: [],
    parameters: {
      pipette: "",
      pipette_obj: {},
      pipette_strategy: "",
      volumes: [],
      volumes_string: "",
      source_sequence: "",
      sourceSequenceId: -1,
      destination_sequence: "",
      destinationSequenceId: -1,
      liquidClass: "Default",
      liquidClassId: 0,
      tipsStrategy: "STANDARD",
      offset: {
        source: 1,
        destination: 1,
        source_type: "Bottom",
        destination_type: "Bottom",
      },
    },
  };
}

/**
 * A getter that returns an object representation of a newly created simple transfer step
 * @param {Number} id - A unique ID (within the scope of steps) to be assigned to the newly created step
 * @returns {object} - An object representation of a newly created simple transfer step
 */
export function getNewSimpleTransferStep(id) {
  return {
    type: "simple_transfer",
    name: `Simple Transfer (${id})`,
    id,
    substeps: [],
    parameters: {
      pipette: "",
      pipette_obj: {},
      pipette_strategy: "",
      volumes: [],
      volumes_string: "",
      source: {
        slot_number: -1,
        slot_name: "",
        wells: [],
      },
      destination: {
        slot_number: -1,
        slot_name: "",
        wells: [],
      },
      liquidClass: "Default",
      liquidClassId: 0,
      tipsStrategy: "STANDARD",
      offset: {
        source: 1,
        destination: 1,
        source_type: "Bottom",
        destination_type: "Bottom",
      },
    },
  };
}

/**
 * A getter that returns an object representation of a newly created slack message step
 * @param {Number} id - A unique ID (within the scope of steps) to be assigned to the newly created step
 * @returns {object} - An object representation of a newly created slack message step
 */
export function getNewSlackMessageStep(id) {
  return {
    type: "slack_message",
    name: `Slack Message (${id})`,
    id,
    substeps: [],
    channel: "",
    webhook: "",
    message: "",
    channel_object: {},
  };
}

/**
 * A getter that returns an object representation of a newly created timer step
 * @param {Number} id - A unique ID (within the scope of steps) to be assigned to the newly created step
 * @returns {object} - An object representation of a newly created timer step
 */
export function getNewTimerStep(id) {
  return {
    type: "timer",
    name: `Timer (${id})`,
    id,
    substeps: [],
    action: {
      start: false,
      wait: false,
      pause: false,
    },
    elapsed_time: 0,
  };
}

/**
 * A getter that returns an array representation of the steps in a newly created protocol
 * @returns {array} - The array representation of the steps in a newly created protocol
 * @see defaultStepsData
 */
export function getDefaultStepsData() {
  return defaultStepsData;
}

/**
 * A getter that returns the length of the array representation of the steps in a newly created protocol
 * @returns {number} - The length of the array representation of the steps in a newly created protocol
 */
export function getDefaultStepsCount() {
  return defaultStepsData.length;
}
