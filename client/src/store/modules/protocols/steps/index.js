import arrayTransferStep from "./_arrayTransferStep";
import bioshakeStep from "./_bioshakeStep";
import loopStep from "./_loopStep";
import pauseStep from "./_pauseStep";
import sequenceTransferStep from "./_sequenceTransferStep";
import simpleTransferStep from "./_simpleTransferStep";
import slackMessageStep from "./_slackMessageStep";
import timerStep from "./_timerStep";
import types from "../../../../types";
import { deleteDeep, duplicateDeep } from "../../../../utils";
import Axios from "axios";
import { OBJECT_API_URL as API_URL } from "../../../../urls";


let stepNameToMTypeMap = {
  loop: types.CREATE_LOOP_STEP,
  pause: types.CREATE_PAUSE_STEP,
  sequence_transfer: types.CREATE_SEQUENCE_TRANSFER_STEP,
  bioshake_3000t: types.CREATE_BIOSHAKE_STEP,
  simple_transfer: types.CREATE_SIMPLE_TRANSFER_STEP,
  slack_message: types.CREATE_SLACK_MESSAGE_STEP,
  timer: types.CREATE_TIMER_STEP,
  array_transfer: types.CREATE_ARRAY_TRANSFER_STEP,
};

export default {
  /**
   * @returns {object} - The Vuex state
   * @namespace state
   */
  state: () => ({
    /**
     * Stores data related to step-related views and forms
     * @memberof state
     * @property {String} stepsstepID - Stores the index of the chosen steps card in the UI
     * @property {String} stepsFormType - Stores the form type of the steps form in the UI
     */
    vars: {
      stepsstepID: -1,
      stepsFormType: "",
    },
    /**
     * Serves as a cache storage for steps data of the protocol being viewed/edited by the user
     * @memberof state
     * @property {array} steps - The steps attribute of the object in the protocol cache
     * @property {number} stepsCounter - A number used to assign unique IDs to newly created step objects
     */
    cache: {
      stepCounter: 0,
      steps: [],
    },
    /**
     * Stores Slack webhook objects fetched from a remote API to be consumed by Slack message steps
     */
    slack_webhooks: [],
  }),
  /**
   * Mutations for the Vuex state
   * @type {object}
   * @namespace mutations
   */
  mutations: {
    /**
     * Resets the step variables storing data related to the step UI view/forms
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @memberof mutations
     */
    [types.RESET_STEP_VARIABLES](state) {
      state.vars.stepsstepID = -1;
      state.vars.stepsFormType = "";
    },
    /**
     * Updates the step variables storing data related to the step UI view/forms
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} data - Contains data used to update the step variables
     * @memberof mutations
     */
    [types.UPDATE_STEP_VARIABLES](state, data) {
      state.vars = { ...state.vars, ...data };
    },
    /**
     * Updates the value of the step counter within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Number} data - A value to be assigned to the step counter within the protocol cache object
     * @memberof mutations
     */
    [types.UPDATE_CACHED_PROTOCOL_STEP_COUNTER](state, data) {
      state.cache.stepCounter = data;
    },
    /**
     * Updates the list of slack webhooks available to protocols
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Number} data - A value to be assigned to the list of slack webhooks within the protocol cache object
     * @memberof mutations
     */
    [types.LOAD_SLACK_WEBHOOK_OBJECTS](state, data) {
      state.slack_webhooks = data;
    },
    /**
     * Clears the list of slack webhooks available to protocols
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @memberof mutations
     */
    [types.UNLOAD_SLACK_WEBHOOK_OBJECTS](state) {
      state.slack_webhooks = [];
    },
    /**
     * Updates the value of the steps attribute of the protocol object cache
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Array.<Object>} data - An array of step objects to be set as the value of the steps attribute of the protocol object cache
     * @memberof mutations
     */
    [types.UPDATE_CACHED_PROTOCOL_STEPS](state, data) {
      state.cache.steps = data;
    },
    /**
     * Resets the value of the steps and step counter attributes of the protocol object cache
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @memberof mutations
     */
    [types.RESET_STEPS](state) {
      state.cache.steps = [];
      state.cache.stepCounter = 0;
    },
    /**
     * Deletes a step (selected by ID) from the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Number} id - The unique ID of the step to be deleted from the protocol cache object
     * @memberof mutations
     */
    [types.DELETE_STEP](state, id) {
      state.cache.steps = deleteDeep(state.cache.steps, id);
    },
    ...arrayTransferStep.mutations,
    ...bioshakeStep.mutations,
    ...loopStep.mutations,
    ...pauseStep.mutations,
    ...sequenceTransferStep.mutations,
    ...simpleTransferStep.mutations,
    ...slackMessageStep.mutations,
    ...timerStep.mutations,
  },
  /**
   * Actions for the Vuex state
   * @type {object}
   * @namespace actions
   */
  actions: {
    /**
     * Commits a mutation that creates a new step that falls under a specified category
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance 
     * @param {String} category - Specifies the type of step to be created (eg. Array transfer)
     * @memberof actions 
     */
    [types.CREATE_STEP]({ commit, dispatch }, category) {
      return new Promise((resolve, reject) => {
        dispatch(stepNameToMTypeMap[category]);
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits a mutation that deletes a step (specified by ID) from the protocol cache object and deletes
     * all representations of its data dependencies from the dependencies value of the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance 
     * @param {Number} id - The unique ID of the step to be deleted from the protocol cache object
     * @memberof actions 
     */
    [types.DELETE_STEP]({ commit, rootGetters }, id) {
      return new Promise((resolve, reject) => {
        commit(types.DELETE_STEP, id);
        commit(
          types.UPDATE_CACHED_PROTOCOL_DEPENDENCY_LINKS,
          rootGetters.cachedProtocolDependencies.filter(
            (obj) => !(obj.sink === "transfer" && obj.sink_hash === id)
          ),
          { root: true }
        );
        commit(types.RESET_STEP_VARIABLES);
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Duplicates a step within the protocol cache object and creates corresponding duplicate representations
     * of the data dependencies it has with other attributes of the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Number} id - The unique identifier of the step to be duplicated within the protocol cache object
     * @memberof mutations
     */
    [types.DUPLICATE_STEP]({ state, commit }, id) {
      return new Promise((resolve, reject) => {
        const clonedStep = duplicateDeep(state.cache.steps, id);
        function registerStep(clonedStep) {
          for (let childStep of clonedStep.substeps) {
            registerStep(childStep);
          }

          if (clonedStep.type.indexOf("transfer") !== -1) {
            commit(
              types.DUPLICATE_CACHED_PROTOCOL_DEPENDENCY_LINK,
              {
                oldIdx: clonedStep.id,
                newIdx: state.cache.stepCounter,
                sink: "transfer",
              },
              { root: true }
            );
          }

          clonedStep.id = state.cache.stepCounter++;
          clonedStep.name = clonedStep.name + " - cloned*";
        }
        registerStep(clonedStep);
        state.cache.steps.push(clonedStep)
        commit(types.UPDATE_CACHED_PROTOCOL_STEPS, state.cache.steps);
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits a mutation to update the value of the steps attribute of the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Array.<Object>} data - A value to be assigned to the steps attribute of the protocol cache object
     * @memberof actions 
     */
    [types.UPDATE_CACHED_PROTOCOL_STEPS]({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_CACHED_PROTOCOL_STEPS, data);
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits a mutation to update the step variables that contain steps form/view UI related data
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data to update the step variables containing steps form/view UI related data
     * @memberof actions 
     */
    [types.UPDATE_STEP_VARIABLES]({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_STEP_VARIABLES, data);
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits a mutation to update the slack webhooks available to protocols
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @memberof actions 
     */
    [types.LOAD_SLACK_WEBHOOK_OBJECTS]({ commit, rootGetters }) {
      return new Promise((resolve, reject) => {
        Axios.get(`${API_URL}/slack_webhook/`, {
          headers: {
            Authorization: rootGetters.userAuthToken,
        }}).then((response) => {
          commit(types.LOAD_SLACK_WEBHOOK_OBJECTS, response.data.map(item => item.slack_webhook))
        })
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits a mutation to clear the list of slack webhooks available to protocols
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @memberof actions 
     */
    [types.UNLOAD_SLACK_WEBHOOK_OBJECTS]({ commit }) {
      return new Promise((resolve, reject) => {
        commit(types.UNLOAD_SLACK_WEBHOOK_OBJECTS);
        resolve();
        reject(new Error("…"));
      });
    },
    ...arrayTransferStep.actions,
    ...bioshakeStep.actions,
    ...loopStep.actions,
    ...pauseStep.actions,
    ...sequenceTransferStep.actions,
    ...simpleTransferStep.actions,
    ...slackMessageStep.actions,
    ...timerStep.actions,
  },
  /**
   * Getters for the Vuex state
   * @type {object}
   * @namespace getters
   */
  getters: {
    /**
     * Fetches a number that qualifies as a unique ID for a newly created step within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @returns {number} - A value that can be assigned to newly created steps as a unique ID
     * @memberof getters
     */
    cachedProtocolStepCounter: (state) => state.cache.stepCounter,
    /**
     * Fetches the array of steps defined within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @returns {array} - The array of steps defined within the protocol cache object
     * @memberof getters
     */
    cachedProtocolSteps: (state) => state.cache.steps,
    /**
     * Fetches an array of slack webhook objects (for the slack message step)
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @returns {array} - An array of slack webhook objects (for the slack message step)
     * @memberof getters
     */
    slackWebhooks: (state) => state.slack_webhooks,
  },
};
