// Please note: this module is not to be used as a Vuex store module
// Instead mutations and actions here are used to populate those of an actual Vuex store module

import types from "../../../../types";
import { findDeep } from "../../../../utils";
import { getNewPauseStep } from "../../../defaultData/stepsData";

export default {
  /**
   * Mutations for the Vuex state
   * @type {object}
   * @namespace mutations
   */
  mutations: {
    /**
     * Creates a pause step within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @memberof mutations
     */
    [types.CREATE_PAUSE_STEP](state) {
      state.cache.steps.push(getNewPauseStep(state.cache.stepCounter++));
    },
    /**
     * Updates the name attribute of a pause step (specified by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} data - Contains data required to update the name attribute of the pause step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the "name" attribute of the step
     * @memberof mutations
     */
    [types.UPDATE_PAUSE_STEP_NAME](state, data) {
      findDeep(state.cache.steps, data.id).name = data.newValue;
    },
    /**
     * Updates the "pause time" attribute of a pause step (specified by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} data - Contains data required to update the "pause time" attribute of the pause step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the "pause time" attribute of the step
     * @memberof mutations
     */
    [types.UPDATE_PAUSE_TIME](state, data) {
      findDeep(state.cache.steps, data.id).pause_time = data.newValue;
    },
    /**
     * Updates the "auto resume" attribute of a pause step (specified by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} data - Contains data required to update the "auto resume" attribute of the pause step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the "auto resume" attribute of the step
     * @memberof mutations
     */
    [types.UPDATE_PAUSE_AUTORESUME](state, data) {
      findDeep(state.cache.steps, data.id).auto_resume = data.newValue;
    },
  },
  /**
   * Actions for the Vuex state
   * @type {object}
   * @namespace actions
   */
  actions: {
    /**
     * Commits a mutation that updates the name attribute of a pause step (specified by ID) within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the name attribute of the pause step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the "name" attribute of the step
     * @memberof actions
     */
    [types.UPDATE_PAUSE_STEP_NAME]({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_PAUSE_STEP_NAME, data);
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits a mutation that updates the "pause time" attribute of a pause step (specified by ID) within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "pause time" attribute of the pause step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the "pause time" attribute of the step
     * @memberof actions
     */
    [types.UPDATE_PAUSE_TIME]({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_PAUSE_TIME, data);
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits a mutation that updates the "auto resume" attribute of a pause step (specified by ID) within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "auto resume" attribute of the pause step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the "auto resume" attribute of the step
     * @memberof actions
     */
    [types.UPDATE_PAUSE_AUTORESUME]({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_PAUSE_AUTORESUME, data);
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits a mutation that creates a pause step within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @memberof actions
     */
    [types.CREATE_PAUSE_STEP]({ commit }) {
      return new Promise((resolve, reject) => {
        commit(types.CREATE_PAUSE_STEP);
        resolve();
        reject(new Error("…"));
      });
    },
  },
};
