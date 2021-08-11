/**
 * Contains a URL that points to the protocol object API to be used to fetch protocol, labware, pipettes, etc.
 * @type {String}
 */
export const OBJECT_API_URL = process.env.VUE_APP_OBJECT_API_URL;
/**
 * Contains a URL that points to the opentrons protocol generator service to be used to simulate and generate Python protocol files
 * from protocol objects as input
 * @type {String}
 */
export const GENERATOR_API_URL = process.env.VUE_APP_GENERATOR_API_URL;
