// Please note: this module is not to be used as a Vuex store module
// Instead mutations and actions here are used to populate those of an actual Vuex store module

import types from "../../../../types";
import { findDeep } from "../../../../utils";
import { getNewSlackMessageStep } from "../../../defaultData/stepsData";

export default {
  /**
   * Mutations for the Vuex state
   * @type {object}
   * @namespace mutations
   */
  mutations: {
    /**
     * Creates a slack message step within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @memberof mutations
     */
    [types.CREATE_SLACK_MESSAGE_STEP](state) {
      state.cache.steps.push(getNewSlackMessageStep(state.cache.stepCounter++));
    },
    /**
     * Updates the name attribute of a slack message step (selected by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} data - Contains data required to update the name attribute of the slack message step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the "name" attribute of the step
     * @memberof mutations
     */
    [types.UPDATE_SLACK_MESSAGE_STEP_NAME](state, data) {
      findDeep(state.cache.steps, data.id).name = data.newValue;
    },
    /**
     * Updates the "message" attribute of a slack message step (selected by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} data - Contains data required to update the "message" attribute of the slack message step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the "message" attribute of the step
     * @memberof mutations
     */
    [types.UPDATE_SLACK_MESSAGE_MESSAGE](state, data) {
      findDeep(state.cache.steps, data.id).message = data.newValue;
    },
    /**
     * Updates the "channel" attribute of a slack message step (selected by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} data - Contains data required to update the "channel" attribute of the slack message step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {Object} data.newValue - The new value of the "channel object" attribute of the step
     * @memberof mutations
     */
    [types.UPDATE_SLACK_MESSAGE_CHANNEL](state, data) {
      let step = findDeep(state.cache.steps, data.id);
      step.channel_object = data.newValue;
      step.channel = data.newValue.channel;
      step.webhook = data.newValue.webhook;
    },
  },
  /**
   * Actions for the Vuex state
   * @type {object}
   * @namespace actions
   */
  actions: {
    /**
     * Commits mutations to update the "name" attribute of a slack message step (specified by ID) within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "name" attribute of the slack message step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the "name" attribute of the step
     * @memberof actions
     */
    [types.UPDATE_SLACK_MESSAGE_STEP_NAME]({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_SLACK_MESSAGE_STEP_NAME, data);
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits mutations to update the "message" attribute of a slack message step (specified by ID) within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "message" attribute of the slack message step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the "message" attribute of the step
     * @memberof actions
     */
    [types.UPDATE_SLACK_MESSAGE_MESSAGE]({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_SLACK_MESSAGE_MESSAGE, data);
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits mutations to update the "channel" attribute of a slack message step (specified by ID) within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "channel" attribute of the slack message step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {Object} data.newValue - The new value of the "channel object" attribute of the step
     * @memberof actions
     */
    [types.UPDATE_SLACK_MESSAGE_CHANNEL]({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_SLACK_MESSAGE_CHANNEL, data);
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits a mutation that creates a slack message step within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @memberof actions
     */
    [types.CREATE_SLACK_MESSAGE_STEP]({ commit }) {
      return new Promise((resolve, reject) => {
        commit(types.CREATE_SLACK_MESSAGE_STEP);
        resolve();
        reject(new Error("…"));
      });
    },
  },
};
