// Please note: this module is not to be used as a Vuex store module
// Instead mutations and actions here are used to populate those of an actual Vuex store module

import types from "../../../../types";
import { findDeep } from "../../../../utils";
import { getNewLoopStep } from "../../../defaultData/stepsData";

export default {
  /**
   * Mutations for the Vuex state
   * @type {object}
   * @namespace mutations
   */
  mutations: {
    /**
     * Creates a loop step within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @memberof mutations
     */
    [types.CREATE_LOOP_STEP](state) {
      state.cache.steps.push(getNewLoopStep(state.cache.stepCounter++));
    },
    /**
     * Updates the name attribute of a loop step (specified by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} data - Contains data required to update the name attribute of the loop step
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the "name" attribute of the step
     * @memberof mutations
     */
    [types.UPDATE_LOOP_STEP_NAME](state, data) {
      findDeep(state.cache.steps, data.id).name = data.newValue;
    },
    /**
     * Updates the "number of iterations" attribute of a loop step (specified by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} data - Contains data required to update the "number of iterations" attribute of the loop step
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the "number of iterations" attribute of the step
     * @memberof mutations
     */
    [types.UPDATE_LOOP_NUMBER](state, data) {
      findDeep(state.cache.steps, data.id).num_iterations = data.newValue;
    },
  },
  /**
   * Actions for the Vuex state
   * @type {object}
   * @namespace actions
   */
  actions: {
    /**
     * Commits a mutation that updates the name attribute of a loop step (specified by ID) within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the name attribute of the loop step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the "name" attribute of the step
     * @memberof actions
     */
    [types.UPDATE_LOOP_STEP_NAME]({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_LOOP_STEP_NAME, data);
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits a mutation that updates the "number of iterations" attribute of a loop step (specified by ID) within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "number of iterations" attribute of the loop step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the "number of iterations" attribute of the step
     * @memberof actions
     */
    [types.UPDATE_LOOP_NUMBER]({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_LOOP_NUMBER, data);
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Creates a loop step within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @memberof actions
     */
    [types.CREATE_LOOP_STEP]({ commit }) {
      return new Promise((resolve, reject) => {
        commit(types.CREATE_LOOP_STEP);
        resolve();
        reject(new Error("…"));
      });
    },
  },
};
