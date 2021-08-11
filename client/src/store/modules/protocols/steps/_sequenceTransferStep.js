// Please note: this module is not to be used as a Vuex store module
// Instead mutations and actions here are used to populate those of an actual Vuex store module

import types from "../../../../types";
import { findDeep, getFloatArrayFromString } from "../../../../utils";
import { getNewSequenceTransferStep } from "../../../defaultData/stepsData";

export default {
  /**
   * Mutations for the Vuex state
   * @type {object}
   * @namespace mutations
   */
  mutations: {
    /**
     * Creates a sequence transfer step within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @memberof mutations
     */
    [types.CREATE_SEQUENCE_TRANSFER_STEP](state) {
      state.cache.steps.push(
        getNewSequenceTransferStep(state.cache.stepCounter++)
      );
    },
    /**
     * Updates the name attribute of a sequence transfer step (specified by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} data - Contains data required to update the name attribute of the sequence transfer step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new step name
     * @memberof mutations
     */
    [types.UPDATE_SEQUENCE_TRANSFER_STEP_NAME](state, data) {
      findDeep(state.cache.steps, data.id).name = data.newValue;
    },
    /**
     * Updates the pipette attribute of a sequence transfer step (specified by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} data - Contains data required to update the pipette attribute of the sequence transfer step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {Object} data.newValue - The new value of the pipette object
     * @memberof mutations
     */
    [types.UPDATE_SEQUENCE_TRANSFER_PIPETTE](state, data) {
      findDeep(state.cache.steps, data.id).parameters.pipette_obj =
        data.newValue;
      findDeep(state.cache.steps, data.id).parameters.pipette =
        data.newValue.category;
    },
    /**
     * Updates the name attribute of a sequence transfer step (specified by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} data - Contains data required to update the name attribute of the sequence transfer step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the pipette strategy
     * @memberof mutations
     */
    [types.UPDATE_SEQUENCE_TRANSFER_PIPETTE_STRATEGY](state, data) {
      findDeep(state.cache.steps, data.id).parameters.pipette_strategy =
        data.newValue;
    },
    /**
     * Updates the "source sequence" attribute of a sequence transfer step (specified by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} data - Contains data required to update the "source sequence" attribute of the sequence transfer step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {Object} data.value - Contains data of the sequence to be assigned
     * @param {Number} data.value.id - The unique ID of the sequence to be assigned
     * @param {String} data.value.name - The name of the sequence to be assigned
     * @memberof mutations
     */
    [types.UPDATE_SEQUENCE_TRANSFER_SOURCE_SEQUENCE](state, data) {
      findDeep(state.cache.steps, data.id).parameters.source_sequence =
        data.value.name;
      findDeep(state.cache.steps, data.id).parameters.sourceSequenceId =
        data.value.id;
    },
    /**
     * Updates the "source offset" attribute of a sequence transfer step (specified by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} data - Contains data required to update the "source offset" attribute of the sequence transfer step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the source offset
     * @memberof mutations
     */
    [types.UPDATE_SEQUENCE_TRANSFER_SOURCE_OFFSET](state, data) {
      findDeep(state.cache.steps, data.id).parameters.offset.source =
        data.newValue;
    },
    /**
     * Updates the "destination sequence" attribute of a sequence transfer step (specified by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} data - Contains data required to update the "destination sequence" attribute of the sequence transfer step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {Object} data.value - Contains data of the sequence to be assigned
     * @param {Number} data.value.id - The unique ID of the sequence to be assigned
     * @param {String} data.value.name - The name of the sequence to be assigned
     * @memberof mutations
     */
    [types.UPDATE_SEQUENCE_TRANSFER_DESTINATION_SEQUENCE](state, data) {
      findDeep(state.cache.steps, data.id).parameters.destination_sequence =
        data.value.name;
      findDeep(state.cache.steps, data.id).parameters.destinationSequenceId =
        data.value.id;
    },
    /**
     * Updates the "destination offset" attribute of a sequence transfer step (specified by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} data - Contains data required to update the "destination offset" attribute of the sequence transfer step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the destination offset
     * @memberof mutations
     */
    [types.UPDATE_SEQUENCE_TRANSFER_DESTINATION_OFFSET](state, data) {
      findDeep(state.cache.steps, data.id).parameters.offset.destination =
        data.newValue;
    },
    /**
     * Updates the "source sequence" attribute of a sequence transfer step (specified by ID)
     * via propagated changes from its data dependencies within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} obj - Contains data required to update the "source sequence" attribute of the sequence transfer step in question
     * @param {String} obj.signal - The type of the propagated dependency change
     * @param {Number} obj.sink_hash - The unique ID of the step to be updated
     * @param {Object} obj.value - Contains data on the sequence object to be assigned
     * @param {String} obj.value.name - The name of the sequence to be assigned
     * @param {Number} obj.value.id - The ID of the sequence to be assigned
     * @memberof mutations
     */
    [types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_SEQUENCE_TRANSFER_SOURCE_SEQUENCE](state, obj) {
      if (obj.signal === "UPDATE") {
        findDeep(state.cache.steps, obj.sink_hash).parameters.sourceSequenceId =
          obj.value.id;
        findDeep(state.cache.steps, obj.sink_hash).parameters.source_sequence =
          obj.value.name;
      } else if (obj.signal === "DELETE") {
        findDeep(
          state.cache.steps,
          obj.sink_hash
        ).parameters.sourceSequenceId = null;
        findDeep(state.cache.steps, obj.sink_hash).parameters.source_sequence =
          "";
      }
    },
    /**
     * Updates the "destination sequence" attribute of a sequence transfer step (specified by ID)
     * via changes propagated from its data dependencies within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} obj - Contains data required to update the "destination sequence" attribute of the sequence transfer step in question
     * @param {String} obj.signal - The type of the propagated dependency change
     * @param {Number} obj.sink_hash - The unique ID of the step to be updated
     * @param {Object} obj.value - Contains data on the sequence object to be assigned
     * @param {String} obj.value.name - The name of the sequence to be assigned
     * @param {Number} obj.value.id - The ID of the sequence to be assigned
     * @memberof mutations
     */
    [types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_SEQUENCE_TRANSFER_DESTINATION_SEQUENCE](state, obj) {
      if (obj.signal === "UPDATE") {
        findDeep(
          state.cache.steps,
          obj.sink_hash
        ).parameters.destinationSequenceId = obj.value.id;
        findDeep(
          state.cache.steps,
          obj.sink_hash
        ).parameters.destination_sequence = obj.value.name;
      } else if (obj.signal === "DELETE") {
        findDeep(
          state.cache.steps,
          obj.sink_hash
        ).parameters.destinationSequenceId = null;
        findDeep(
          state.cache.steps,
          obj.sink_hash
        ).parameters.destination_sequence = "";
      }
    },
    /**
     * Updates the "liquid class" attribute of a sequence transfer step (specified by ID)
     * via propagated changes from its data dependencies within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} obj - Contains data required to update the "liquid class" attribute of the sequence transfer step in question
     * @param {String} obj.signal - The type of the propagated dependency change
     * @param {Number} obj.sink_hash - The unique ID of the step to be updated
     * @param {Object} obj.value - Contains data on the liquid class object to be assigned
     * @param {String} obj.value.name - The name of the liquid class to be assigned
     * @param {Number} obj.value.id - The ID of the liquid class to be assigned
     * @memberof mutations
     */
    [types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_SEQUENCE_TRANSFER_LIQUID_CLASS](state, obj) {
      if (obj.signal === "UPDATE") {
        findDeep(state.cache.steps, obj.sink_hash).parameters.liquidClassId =
          obj.value.id;
        findDeep(state.cache.steps, obj.sink_hash).parameters.liquidClass =
          obj.value.name;
      } else if (obj.signal === "DELETE") {
        findDeep(
          state.cache.steps,
          obj.sink_hash
        ).parameters.liquidClassId = null;
        findDeep(state.cache.steps, obj.sink_hash).parameters.liquidClass = "";
      }
    },
    /**
     * Updates the "tips strategy" attribute of a sequence transfer step (specified by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} data - Contains data required to update the "tips strategy" attribute of the sequence transfer step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the tips strategy
     * @memberof mutations
     */
    [types.UPDATE_SEQUENCE_TRANSFER_TIPS_STRATEGY](state, data) {
      findDeep(state.cache.steps, data.id).parameters.tipsStrategy =
        data.newValue;
    },
    /**
     * Updates the "destination offset type" attribute of a sequence transfer step (specified by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} data - Contains data required to update the "destination offset type" attribute of the sequence transfer step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the step's destination offset type
     * @memberof mutations
     */
    [types.UPDATE_SEQUENCE_TRANSFER_DESTINATION_OFFSET_TYPE](state, data) {
      findDeep(state.cache.steps, data.id).parameters.offset.destination_type =
        data.newValue;
    },
    /**
     * Updates the "source offset type" attribute of a sequence transfer step (specified by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} data - Contains data required to update the "source offset type" attribute of the sequence transfer step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the step's source type
     * @memberof mutations
     */
    [types.UPDATE_SEQUENCE_TRANSFER_SOURCE_OFFSET_TYPE](state, data) {
      findDeep(state.cache.steps, data.id).parameters.offset.source_type =
        data.newValue;
    },
    /**
     * Updates the "liquid class" attribute of a sequence transfer step (specified by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} data - Contains data required to update the "liquid class" attribute of the sequence transfer step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {Object} data.value - Contains data of the liquid class to be assigned
     * @param {Number} data.value.id - The unique ID of the liquid class to be assigned
     * @param {String} data.value.name - The name of the liquid class to be assigned
     * @memberof mutations
     */
    [types.UPDATE_SEQUENCE_TRANSFER_LIQUID_CLASS](state, data) {
      findDeep(state.cache.steps, data.id).parameters.liquidClass =
        data.value.name;
      findDeep(state.cache.steps, data.id).parameters.liquidClassId =
        data.value.id;
    },
    /**
     * Updates the "volumes" attribute of a sequence transfer step (specified by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} data - Contains data required to update the "volumes" attribute of the sequence transfer step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the step's volumes attribute
     * @memberof mutations
     */
    [types.UPDATE_SEQUENCE_TRANSFER_VOLUMES](state, data) {
      findDeep(state.cache.steps, data.id).parameters.volumes_string =
        data.newValue;
      findDeep(
        state.cache.steps,
        data.id
      ).parameters.volumes = getFloatArrayFromString(data.newValue);
    },
    /**
     * Updates the "pipette" attribute of a sequence transfer step (specified by ID)
     * via propagated changes from its data dependencies within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} obj - Contains data required to update the "tips strategy" attribute of the sequence transfer step in question
     * @param {String} obj.signal - The type of the propagated dependency change
     * @param {Number} obj.sink_hash - The unique ID of the step to be updated
     * @param {Object} obj.value - Contains data on the pipette object to be assigned
     * @memberof mutations
     */
    [types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_SEQUENCE_TRANSFER_PIPETTE](state, obj) {
      if (obj.signal === "UPDATE") {
        findDeep(state.cache.steps, obj.sink_hash).parameters.pipette_obj =
          obj.value;
        findDeep(state.cache.steps, obj.sink_hash).parameters.pipette =
          obj.value.category;
      } else if (obj.signal === "DELETE") {
        findDeep(state.cache.steps, obj.sink_hash).parameters.pipette_obj = {};
        findDeep(state.cache.steps, obj.sink_hash).parameters.pipette = "";
      }
    },
  },
  /**
   * Actions for the Vuex state
   * @type {object}
   * @namespace actions
   */
  actions: {
    /**
     * Commits a mutation to update the name attribute of a sequence transfer step (specified by ID) within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the name attribute of the sequence transfer step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new step name
     * @memberof actions
     */
    [types.UPDATE_SEQUENCE_TRANSFER_STEP_NAME]({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_SEQUENCE_TRANSFER_STEP_NAME, data);
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits mutations to update the pipette attribute of a sequence transfer step (specified by ID)
     * and representations of its data dependencies within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the pipette attribute of the sequence transfer step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {Object} data.newValue - The new value of the pipette object
     * @memberof actions
     */
    [types.UPDATE_SEQUENCE_TRANSFER_PIPETTE]({ commit, rootGetters }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_SEQUENCE_TRANSFER_PIPETTE, data);
        rootGetters.cachedProtocolDependencies.filter(
          (obj) =>
            obj.sink === "transfer" &&
            obj.sink_hash === data.id &&
            obj.sink_ppty === "pipette"
        )[0].source_hash = [data.newValue.category];
        commit(
          types.UPDATE_CACHED_PROTOCOL_DEPENDENCY_LINKS,
          rootGetters.cachedProtocolDependencies,
          { root: true }
        );
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits a mutation to update the "pipette strategy" attribute of a sequence transfer step (specified by ID) within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "pipette strategy" attribute of the sequence transfer step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the pipette strategy
     * @memberof actions
     */
    [types.UPDATE_SEQUENCE_TRANSFER_PIPETTE_STRATEGY]({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_SEQUENCE_TRANSFER_PIPETTE_STRATEGY, data);
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits mutations to update the "source sequence" attribute of a sequence transfer step (specified by ID)
     * and representations of its data dependencies within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "source sequence" attribute of the sequence transfer step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {Object} data.value - Contains data of the sequence to be assigned
     * @param {Number} data.value.id - The unique ID of the sequence to be assigned
     * @param {String} data.value.name - The name of the sequence to be assigned
     * @memberof actions
     */
    [types.UPDATE_SEQUENCE_TRANSFER_SOURCE_SEQUENCE](
      { commit, rootGetters },
      data
    ) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_SEQUENCE_TRANSFER_SOURCE_SEQUENCE, data);
        rootGetters.cachedProtocolDependencies.filter(
          (obj) =>
            obj.sink === "transfer" &&
            obj.sink_hash === data.id &&
            obj.sink_ppty === "source_sequence"
        )[0].source_hash = [data.value.id];
        commit(
          types.UPDATE_CACHED_PROTOCOL_DEPENDENCY_LINKS,
          rootGetters.cachedProtocolDependencies,
          { root: true }
        );
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits mutations to update the "destination sequence" attribute of a sequence transfer step (specified by ID)
     * and representations of its data dependencies within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "destination sequence" attribute of the sequence transfer step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {Object} data.value - Contains data of the sequence to be assigned
     * @param {Number} data.value.id - The unique ID of the sequence to be assigned
     * @param {String} data.value.name - The name of the sequence to be assigned
     * @memberof actions
     */
    [types.UPDATE_SEQUENCE_TRANSFER_DESTINATION_SEQUENCE](
      { commit, rootGetters },
      data
    ) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_SEQUENCE_TRANSFER_DESTINATION_SEQUENCE, data);
        rootGetters.cachedProtocolDependencies.filter(
          (obj) =>
            obj.sink === "transfer" &&
            obj.sink_hash === data.id &&
            obj.sink_ppty === "destination_sequence"
        )[0].source_hash = [data.value.id];
        commit(
          types.UPDATE_CACHED_PROTOCOL_DEPENDENCY_LINKS,
          rootGetters.cachedProtocolDependencies,
          { root: true }
        );
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits mutations to update the "tips strategy" attribute of a sequence transfer step (specified by ID) within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "tips strategy" attribute of the sequence transfer step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the tips strategy
     * @memberof actions
     */
    [types.UPDATE_SEQUENCE_TRANSFER_TIPS_STRATEGY]({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_SEQUENCE_TRANSFER_TIPS_STRATEGY, data);
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits mutations to update the "destination offset type" attribute of a sequence transfer step (specified by ID) within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "destination offset type" attribute of the sequence transfer step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the step's destination type
     * @memberof actions
     */
    [types.UPDATE_SEQUENCE_TRANSFER_DESTINATION_OFFSET_TYPE](
      { commit },
      data
    ) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_SEQUENCE_TRANSFER_DESTINATION_OFFSET_TYPE, data);
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits mutations to update the "source offset type" attribute of a sequence transfer step (specified by ID) within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "source offset type" attribute of the sequence transfer step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the step's source type
     * @memberof actions
     */
    [types.UPDATE_SEQUENCE_TRANSFER_SOURCE_OFFSET_TYPE]({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_SEQUENCE_TRANSFER_SOURCE_OFFSET_TYPE, data);
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits mutations to update the "liquid class" attribute of a sequence transfer step (specified by ID)
     * and representations of its data dependencies within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "liquid class" attribute of the sequence transfer step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {Object} data.value - Contains data of the liquid class to be assigned
     * @param {Number} data.value.id - The unique ID of the liquid class to be assigned
     * @param {String} data.value.name - The name of the liquid class to be assigned
     * @memberof actions
     */
    [types.UPDATE_SEQUENCE_TRANSFER_LIQUID_CLASS](
      { commit, rootGetters },
      data
    ) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_SEQUENCE_TRANSFER_LIQUID_CLASS, data);
        rootGetters.cachedProtocolDependencies.filter(
          (obj) =>
            obj.sink === "transfer" &&
            obj.sink_hash === data.id &&
            obj.sink_ppty === "liquid_class"
        )[0].source_hash = [data.value.id];
        commit(
          types.UPDATE_CACHED_PROTOCOL_DEPENDENCY_LINKS,
          rootGetters.cachedProtocolDependencies,
          { root: true }
        );
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits mutations to update the "source offset" attribute of a sequence transfer step (specified by ID) within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "source offset" attribute of the sequence transfer step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the source offset
     * @memberof actions
     */
    [types.UPDATE_SEQUENCE_TRANSFER_SOURCE_OFFSET]({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_SEQUENCE_TRANSFER_SOURCE_OFFSET, data);
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits mutations to update the "destination offset" attribute of a sequence transfer step (specified by ID) within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "destination offset" attribute of the sequence transfer step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the source offset
     * @memberof actions
     */
    [types.UPDATE_SEQUENCE_TRANSFER_DESTINATION_OFFSET]({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_SEQUENCE_TRANSFER_DESTINATION_OFFSET, data);
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits mutations to update the "volumes" attribute of a sequence transfer step (specified by ID) within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "volumes" attribute of the sequence transfer step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the step's volumes attribute
     * @memberof actions
     */
    [types.UPDATE_SEQUENCE_TRANSFER_VOLUMES]({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_SEQUENCE_TRANSFER_VOLUMES, data);
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits mutations to update the "source sequence" attribute of a sequence transfer step (specified by ID)
     * via propagated changes from its data dependencies within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} obj - Contains data required to update the "source sequence" attribute of the sequence transfer step in question
     * @param {String} obj.signal - The type of the propagated dependency change
     * @param {Number} obj.sink_hash - The unique ID of the step to be updated
     * @param {Object} obj.value - Contains data on the sequence object to be assigned
     * @param {String} obj.value.name - The name of the sequence to be assigned
     * @param {Number} obj.value.id - The ID of the sequence to be assigned
     * @memberof actions
     */
    [types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_SEQUENCE_TRANSFER_SOURCE_SEQUENCE]({ commit }, obj) {
      return new Promise((resolve, reject) => {
        commit(types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_SEQUENCE_TRANSFER_SOURCE_SEQUENCE, obj);
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits mutations to update the "destination sequence" attribute of a sequence transfer step (specified by ID)
     * via propagated changes from its data dependencies within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} obj - Contains data required to update the "destination sequence" attribute of the sequence transfer step in question
     * @param {String} obj.signal - The type of the propagated dependency change
     * @param {Number} obj.sink_hash - The unique ID of the step to be updated
     * @param {Object} obj.value - Contains data on the sequence object to be assigned
     * @param {String} obj.value.name - The name of the sequence to be assigned
     * @param {Number} obj.value.id - The ID of the sequence to be assigned
     * @memberof actions
     */
    [types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_SEQUENCE_TRANSFER_DESTINATION_SEQUENCE](
      { commit },
      obj
    ) {
      return new Promise((resolve, reject) => {
        commit(types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_SEQUENCE_TRANSFER_DESTINATION_SEQUENCE, obj);
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits mutations to update the "liquid class" attribute of a sequence transfer step (specified by ID)
     * via propagated changes from its data dependencies within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} obj - Contains data required to update the "liquid class" attribute of the sequence transfer step in question
     * @param {String} obj.signal - The type of the propagated dependency change
     * @param {Number} obj.sink_hash - The unique ID of the step to be updated
     * @param {Object} obj.value - Contains data on the liquid class object to be assigned
     * @param {String} obj.value.name - The name of the liquid class to be assigned
     * @param {Number} obj.value.id - The ID of the liquid class to be assigned
     * @memberof actions
     */
    [types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_SEQUENCE_TRANSFER_LIQUID_CLASS]({ commit }, obj) {
      return new Promise((resolve, reject) => {
        commit(types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_SEQUENCE_TRANSFER_LIQUID_CLASS, obj);
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits mutations to update the "pipette" attribute of a sequence transfer step (specified by ID)
     * via propagated changes from its data dependencies within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "pipette" attribute of the sequence transfer step in question
     * @param {String} obj.signal - The type of the propagated dependency change
     * @param {Number} obj.sink_hash - The unique ID of the step to be updated
     * @param {Object} obj.value - Contains data on the pipette object to be assigned
     * @memberof actions
     */
    [types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_SEQUENCE_TRANSFER_PIPETTE]({ commit }, obj) {
      return new Promise((resolve, reject) => {
        commit(types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_SEQUENCE_TRANSFER_PIPETTE, obj);
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits mutations that identify and stores representations of the data dependencies of this step within the dependencies
     * attribute of the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance 
     * @param {Object} step - The step object for which dependency objects are to be generated
     * @memberof actions 
     */
    [types.LOAD_SEQUENCE_TRANSFER_DEPENDENCY_LINKS]({ commit }, step) {
      return new Promise((resolve, reject) => {
        commit(
          types.ADD_CACHED_PROTOCOL_DEPENDENCY_LINK,
          {
            sink: "transfer",
            sink_hash: step.id,
            sink_ppty: "source_sequence",
            source: "sequence",
            source_hash: [step.parameters.sourceSequenceId],
            atype: types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_SEQUENCE_TRANSFER_SOURCE_SEQUENCE,
          },
          { root: true }
        );
        commit(
          types.ADD_CACHED_PROTOCOL_DEPENDENCY_LINK,
          {
            sink: "transfer",
            sink_hash: step.id,
            sink_ppty: "destination_sequence",
            source: "sequence",
            source_hash: [step.parameters.destinationSequenceId],
            atype: types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_SEQUENCE_TRANSFER_DESTINATION_SEQUENCE,
          },
          { root: true }
        );
        commit(
          types.ADD_CACHED_PROTOCOL_DEPENDENCY_LINK,
          {
            sink: "transfer",
            sink_hash: step.id,
            sink_ppty: "liquid_class",
            source: "liquidClass",
            source_hash: [step.parameters.liquidClassId],
            atype: types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_SEQUENCE_TRANSFER_LIQUID_CLASS,
          },
          { root: true }
        );
        commit(
          types.ADD_CACHED_PROTOCOL_DEPENDENCY_LINK,
          {
            sink: "transfer",
            sink_hash: step.id,
            sink_ppty: "pipette",
            source: "pipette",
            source_hash: [step.parameters.pipette],
            atype: types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_SEQUENCE_TRANSFER_PIPETTE,
          },
          { root: true }
        );
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits a mutation that creates a sequence transfer step and registers representations of its data dependencies
     * with other attributes of the parent protocol within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @memberof actions
     */
    [types.CREATE_SEQUENCE_TRANSFER_STEP]({ state, commit }) {
      return new Promise((resolve, reject) => {
        commit(types.CREATE_SEQUENCE_TRANSFER_STEP);
        commit(
          types.ADD_CACHED_PROTOCOL_DEPENDENCY_LINK,
          {
            sink: "transfer",
            sink_hash: state.cache.stepCounter - 1,
            sink_ppty: "source_sequence",
            source: "sequence",
            source_hash: [],
            atype: types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_SEQUENCE_TRANSFER_SOURCE_SEQUENCE,
          },
          { root: true }
        );
        commit(
          types.ADD_CACHED_PROTOCOL_DEPENDENCY_LINK,
          {
            sink: "transfer",
            sink_hash: state.cache.stepCounter - 1,
            sink_ppty: "destination_sequence",
            source: "sequence",
            source_hash: [],
            atype: types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_SEQUENCE_TRANSFER_DESTINATION_SEQUENCE,
          },
          { root: true }
        );
        commit(
          types.ADD_CACHED_PROTOCOL_DEPENDENCY_LINK,
          {
            sink: "transfer",
            sink_hash: state.cache.stepCounter - 1,
            sink_ppty: "liquid_class",
            source: "liquidClass",
            source_hash: [0],
            atype: types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_SEQUENCE_TRANSFER_LIQUID_CLASS,
          },
          { root: true }
        );
        commit(
          types.ADD_CACHED_PROTOCOL_DEPENDENCY_LINK,
          {
            sink: "transfer",
            sink_hash: state.cache.stepCounter - 1,
            sink_ppty: "pipette",
            source: "pipette",
            source_hash: [],
            atype: types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_SEQUENCE_TRANSFER_PIPETTE,
          },
          { root: true }
        );
        resolve();
        reject(new Error("…"));
      });
    },
  },
};
