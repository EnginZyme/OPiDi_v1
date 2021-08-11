// Please note: this module is not to be used as a Vuex store module
// Instead mutations and actions here are used to populate those of an actual Vuex store module

import types from "../../../../types";
import { findDeep } from "../../../../utils";
import { getNewBioshakeStep } from "../../../defaultData/stepsData";

export default {
  /**
   * Mutations for the Vuex state
   * @type {object}
   * @namespace mutations
   */
  mutations: {
    /**
     * Creates a bioshake step within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @memberof mutations
     */
    [types.CREATE_BIOSHAKE_STEP](state) {
      state.cache.steps.push(getNewBioshakeStep(state.cache.stepCounter++));
    },
    /**
     * Updates the name attribute of a bioshake step (specified by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} data - Contains data required to update the name attribute of the bioshake step
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the name attribute of the step
     * @memberof mutations
     */
    [types.UPDATE_BIOSHAKE_STEP_NAME](state, data) {
      findDeep(state.cache.steps, data.id).name = data.newValue;
    },
    /**
     * Updates the speed attribute of a bioshake step (specified by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} data - Contains data required to update the speed attribute of the bioshake step
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the speed attribute of the step
     * @memberof mutations
     */
    [types.UPDATE_BIOSHAKE_SPEED](state, data) {
      findDeep(state.cache.steps, data.id).parameters.speed = data.newValue;
    },
    /**
     * Updates the setpoint attribute of a bioshake step (specified by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} data - Contains data required to update the setpoint attribute of the bioshake step
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the setpoint attribute of the step
     * @memberof mutations
     */
    [types.UPDATE_BIOSHAKE_SETPOINT](state, data) {
      findDeep(state.cache.steps, data.id).parameters.setpoint = data.newValue;
    },
    /**
     * Updates the "temperature control" attribute of a bioshake step (specified by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} data - Contains data required to update the "temperature control" attribute of the bioshake step
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the "temperature control" attribute of the step
     * @memberof mutations
     */
    [types.UPDATE_BIOSHAKE_TEMPERATURE_CONTROL](state, data) {
      findDeep(state.cache.steps, data.id).parameters.tempControl =
        data.newValue;
    },
    /**
     * Updates the "cool down" attribute of a bioshake step (specified by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} data - Contains data required to update the "cool down" attribute of the bioshake step
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the "cool down" attribute of the step
     * @memberof mutations
     */
    [types.UPDATE_BIOSHAKE_COOLDOWN](state, data) {
      findDeep(state.cache.steps, data.id).parameters.cooldown = data.newValue;
    },
    /**
     * Updates the "wait for stop" attribute of a bioshake step (specified by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} data - Contains data required to update the "wait for stop" attribute of the bioshake step
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the "wait for stop" attribute of the step
     * @memberof mutations
     */
    [types.UPDATE_BIOSHAKE_WAIT_FOR_STOP](state, data) {
      findDeep(state.cache.steps, data.id).parameters.wait_for_stop =
        data.newValue;
    },
    /**
     * Updates the "force stop" attribute of a bioshake step (specified by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} data - Contains data required to update the "force stop" attribute of the bioshake step
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the "force stop" attribute of the step
     * @memberof mutations
     */
    [types.UPDATE_BIOSHAKE_FORCE_STOP](state, data) {
      findDeep(state.cache.steps, data.id).parameters.force_stop =
        data.newValue;
    },
    /**
     * Updates the duration attribute of a bioshake step (specified by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} data - Contains data required to update the duration attribute of the bioshake step
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the "duration" attribute of the step
     * @memberof mutations
     */
    [types.UPDATE_BIOSHAKE_DURATION](state, data) {
      findDeep(state.cache.steps, data.id).parameters.duration = data.newValue;
    },
  },
  /**
   * Actions for the Vuex state
   * @type {object}
   * @namespace actions
   */
  actions: {
    /**
     * Commits a mutation to update the name attribute of a bioshake step (specified by ID) within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the name attribute of the bioshake step
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the name attribute of the step
     * @memberof actions
     */
    [types.UPDATE_BIOSHAKE_STEP_NAME]({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_BIOSHAKE_STEP_NAME, data);
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits a mutation to update the speed attribute of a bioshake step (specified by ID) within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the speed attribute of the bioshake step
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the speed attribute of the step
     * @memberof actions
     */
    [types.UPDATE_BIOSHAKE_SPEED]({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_BIOSHAKE_SPEED, data);
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits a mutation to update the setpoint attribute of a bioshake step (specified by ID) within the protocol cache object
     * @ context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the setpoint attribute of the bioshake step
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the setpoint attribute of the step
     * @memberof actions
     */
    [types.UPDATE_BIOSHAKE_SETPOINT]({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_BIOSHAKE_SETPOINT, data);
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits a mutation to update the "temperature control" attribute of a bioshake step (specified by ID) within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "temperature control" attribute of the bioshake step
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the "temperature control" attribute of the step
     * @memberof actions
     */
    [types.UPDATE_BIOSHAKE_TEMPERATURE_CONTROL]({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_BIOSHAKE_TEMPERATURE_CONTROL, data);
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits a mutation to update the "cool down" attribute of a bioshake step (specified by ID) within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "cool down" attribute of the bioshake step
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the "cool down" attribute of the step
     * @memberof actions
     */
    [types.UPDATE_BIOSHAKE_COOLDOWN]({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_BIOSHAKE_COOLDOWN, data);
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits a mutation to update the "wait for stop" attribute of a bioshake step (specified by ID) within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "wait for stop" attribute of the bioshake step
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the "wait for stop" attribute of the step
     * @memberof actions
     */
    [types.UPDATE_BIOSHAKE_WAIT_FOR_STOP]({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_BIOSHAKE_WAIT_FOR_STOP, data);
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits a mutation to update the "force stop" attribute of a bioshake step (specified by ID) within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "force stop" attribute of the bioshake step
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the "force stop" attribute of the step
     * @memberof actions
     */
    [types.UPDATE_BIOSHAKE_FORCE_STOP]({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_BIOSHAKE_FORCE_STOP, data);
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits a mutation to update the duration attribute of a bioshake step (specified by ID) within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the duration attribute of the bioshake step
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the "duration" attribute of the step
     * @memberof actions
     */
    [types.UPDATE_BIOSHAKE_DURATION]({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_BIOSHAKE_DURATION, data);
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits a mutation to create a bioshake step within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @memberof actions
     */
    [types.CREATE_BIOSHAKE_STEP]({ commit }) {
      return new Promise((resolve, reject) => {
        commit(types.CREATE_BIOSHAKE_STEP);
        resolve();
        reject(new Error("…"));
      });
    },
  },
};
