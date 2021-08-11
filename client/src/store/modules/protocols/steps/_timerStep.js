// Please note: this module is not to be used as a Vuex store module
// Instead mutations and actions here are used to populate those of an actual Vuex store module

import types from "../../../../types";
import { findDeep } from "../../../../utils";
import { getNewTimerStep } from "../../../defaultData/stepsData";

export default {
  /**
   * Mutations for the Vuex state
   * @type {object}
   * @namespace mutations
   */
  mutations: {
    /**
     * Creates a timer step within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @memberof mutations
     */
    [types.CREATE_TIMER_STEP](state) {
      state.cache.steps.push(getNewTimerStep(state.cache.stepCounter++));
    },
    /**
     * Updates the name attribute of a timer step (selected by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} data - Contains data required to update the name attribute of the timer step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the "name" attribute of the step
     * @memberof mutations
     */
    [types.UPDATE_TIMER_STEP_NAME](state, data) {
      findDeep(state.cache.steps, data.id).name =
        data.newValue;
    },
    /**
     * Updates the "elapsed time" attribute of a timer step (selected by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} data - Contains data required to update the "elapsed time" attribute of the timer step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the "elapsed time" attribute of the step
     * @memberof mutations
     */
    [types.UPDATE_TIMER_ELAPSED_TIME](state, data) {
      findDeep(state.cache.steps, data.id).elapsed_time =
        data.newValue;
    },
    /**
     * Updates the "timer actions" attribute of a timer step (selected by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} data - Contains data required to update the "timer actions" attribute of the timer step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the "action" attribute of the step
     * @memberof mutations
     */
    [types.UPDATE_TIMER_ACTIONS](state, data) {
      findDeep(state.cache.steps, data.id).action = {
        ...{
          start: false,
          wait: false,
          pause: false,
        },
        ...data.newValue,
      };
    },
  },
  /**
   * Actions for the Vuex state
   * @type {object}
   * @namespace actions
   */
  actions: {
    /**
     * Commits mutations to update the "name" attribute of a timer step (specified by ID) within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "name" attribute of the timer step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the "name" attribute of the step
     * @memberof actions
     */
    [types.UPDATE_TIMER_STEP_NAME]({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_TIMER_STEP_NAME, data);
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, {root: true});
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits mutations to update the "elapsed time" attribute of a timer step (specified by ID) within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "elapsed time" attribute of the timer step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the "elapsed time" attribute of the step
     * @memberof actions
     */
    [types.UPDATE_TIMER_ELAPSED_TIME]({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_TIMER_ELAPSED_TIME, data);
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, {root: true});
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits mutations to update the "timer actions" attribute of a timer step (specified by ID) within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "timer actions" attribute of the timer step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the "action" attribute of the step
     * @memberof actions
     */
    [types.UPDATE_TIMER_ACTIONS]({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_TIMER_ACTIONS, data);
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, {root: true});
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits a mutation that creates a timer step within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @memberof actions
     */
    [types.CREATE_TIMER_STEP]({ commit }) {
      return new Promise((resolve, reject) => {
        commit(types.CREATE_TIMER_STEP);
        resolve();
        reject(new Error("…"));
      });
    },
  },
};
