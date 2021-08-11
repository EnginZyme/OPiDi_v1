import Axios from "axios";
import types from "../../../types";
import { OBJECT_API_URL as API_URL } from "../../../urls";

export default {
  /**
   * @returns {object} - The Vuex state
   * @namespace state
   */
  state: () => ({
    /**
     * A representation of all available labwares in state
     * @type {array}
     * @memberof state
     */
    labwares: [],
    /**
     * A representation of all available pipettes in state
     * @type {array}
     * @memberof state
     */
    pipettes: [],
    /**
     * An array that will store the labware definitions available to a protocol
     * @typedef {array}
     * @memberof state
     */
    labwareDefinitions: [],
  }),
  /**
   * Mutations for the Vuex state
   * @type {object}
   * @namespace mutations
   */
  mutations: {
    /**
     * Saves labware definition objects to the store
     * @param {Object} state - (Vuex Arg) The state within this local context
     * @param {Array.<Object>} labwareDefinitions - An array containing labware definition objects to be saved to the store
     * @memberof mutations
     */
    [types.LOAD_LABWARE_DEFINITION_OBJECTS](state, labwareDefinitions) {
      state.labwareDefinitions = [];
      state.labwareDefinitions.push(...labwareDefinitions);
    },
    /**
     * Saves labware objects to the store
     * @param {Object} state - (Vuex Arg) The state within this local context
     * @param {Array.<Object>} labwares - An array containing labware objects to be saved to the store
     * @memberof mutations
     */
    [types.LOAD_LABWARE_OBJECTS](state, labwares) {
      state.labwares = [];
      state.labwares.push(...labwares);
    },
    /**
     * Saves pipette objects to the store
     * @param {Object} state - (Vuex Arg) The state within this local context
     * @param {Array.<Object>} pipettes - An array containing pipette objects to be saved to the store
     * @memberof mutations
     */
    [types.LOAD_PIPETTE_OBJECTS](state, pipettes) {
      state.pipettes = [];
      state.pipettes.push(...pipettes);
    },
    /**
     * Removes all saved labware definition objects from the store
     * @param {Object} state - (Vuex Arg) The state within this local context
     * @memberof mutations
     */
    [types.UNLOAD_LABWARE_DEFINITION_OBJECTS](state) {
      state.labwareDefinitions = [];
    },
    /**
     * Removes all saved labware objects from the store
     * @param {Object} state - (Vuex Arg) The state within this local context
     * @memberof mutations
     */
    [types.UNLOAD_LABWARE_OBJECTS](state) {
      state.labwares = [];
    },
    /**
     * Removes all saved pipette objects from the store
     * @param {Object} state - (Vuex Arg) The state within this local context
     * @memberof mutations
     */
    [types.UNLOAD_PIPETTE_OBJECTS](state) {
      state.pipettes = [];
    },
  },
  /**
   * Actions for the Vuex state
   * @type {object}
   * @namespace actions
   */
  actions: {
    /**
     * Commits a mutation to load labware definition objects into the store
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @memberof actions
     */
    [types.LOAD_LABWARES]({ commit, rootGetters }) {
      return new Promise((resolve, reject) => {
        Axios.get(`${API_URL}/labware_def/`, {
          headers: {
            Authorization: rootGetters.userAuthToken,
          },
        }).then((response) => {
          commit(types.LOAD_LABWARE_DEFINITION_OBJECTS, response.data);
        });
        Axios.get(`${API_URL}/labware/`, {
          headers: {
            Authorization: rootGetters.userAuthToken,
          },
        }).then((response) => {
          commit(
            types.LOAD_LABWARE_OBJECTS,
            response.data.map((item) => item.labware)
          );
        });
        Axios.get(`${API_URL}/pipette/`, {
          headers: {
            Authorization: rootGetters.userAuthToken,
          },
        }).then((response) => {
          commit(
            types.LOAD_PIPETTE_OBJECTS,
            response.data.map((item) => item.pipette)
          );
        });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Removes all saved pipette objects from the store
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @memberof actions
     */
    [types.UNLOAD_LABWARES]({ commit }) {
      return new Promise((resolve, reject) => {
        commit(types.UNLOAD_LABWARE_DEFINITION_OBJECTS);
        commit(types.UNLOAD_LABWARE_OBJECTS);
        commit(types.UNLOAD_PIPETTE_OBJECTS);
        resolve();
        reject(new Error("…"));
      });
    },
  },
  /**
   * Getters for the Vuex state
   * @type {object}
   * @namespace getters
   */
  getters: {
    /**
     * Fetches an array of the pipettes available to be chosen within a protocol
     * @param {Object} state - (Vuex Arg) The state within the deck module
     * @returns {array} - An array of the pipettes available to be chosen from
     * @memberof getters
     */
    pipettes: (state) => state.pipettes,
    /**
     * Fetches an array of all labware available for selection that are tipracks
     * @param {Object} state - (Vuex Arg) The state within the deck module
     * @returns {array} - An array of labware available for selection that are tipracks
     * @memberof getters
     */
    tipRacks: (state) =>
      state.labwares.filter((item) => item.labware_type === "tipRack"),
    /**
     * Fetches an array of all labware available for selection that are tuberacks
     * @param {Object} state - (Vuex Arg) The state within the deck module
     * @returns {array} - An array of labware available for selection that are tracks
     * @memberof getters
     */
    tubeRacks: (state) =>
      state.labwares.filter((item) => item.labware_type === "tubeRack"),
    /**
     * Fetches an array of all labware available for selection that are well plates
     * @param {Object} state - (Vuex Arg) The state within the deck module
     * @returns {array} - An array of labware available for selection that are well plates
     * @memberof getters
     */
    wellPlates: (state) =>
      state.labwares.filter((item) => item.labware_type === "wellPlate"),
    /**
     * Fetches an array of all labware available for selection that are reservoirs
     * @param {Object} state - (Vuex Arg) The state within the deck module
     * @returns {array} - An array of labware available for selection that are reservoirs
     * @memberof getters
     */
    reservoirs: (state) =>
      state.labwares.filter((item) => item.labware_type === "reservoir"),
    /**
     * Fetches an array of all labware available for selection that are shaker labware
     * @param {Object} state - (Vuex Arg) The state within the deck module
     * @returns {array} - An array of labware available for selection that are shaker labware
     * @memberof getters
     */
    shakerLabwares: (state) =>
      state.labwares.filter((item) => item.labware_type === "shakerLabware"),
    /**
     * Gets all labware definition objects available to protocols
     * @param {Object} state - (Vuex Arg) The state within this local context
     * @returns {array} - An array of all labware definition objects available to protocols
     */
    labwareDefinitions: (state) => state.labwareDefinitions,
  },
};
