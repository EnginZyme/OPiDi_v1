// Please note: this module is not to be used as a Vuex store module
// Instead mutations and actions here are used to populate those of an actual Vuex store module

import types from "../../../../types";
import { findDeep, getFloatArrayFromString } from "../../../../utils";
import { getNewSimpleTransferStep } from "../../../defaultData/stepsData";

export default {
  /**
   * Mutations for the Vuex state
   * @type {object}
   * @namespace mutations
   */
  mutations: {
    /**
     * Creates a simple transfer step within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @memberof mutations
     */
    [types.CREATE_SIMPLE_TRANSFER_STEP](state) {
      state.cache.steps.push(getNewSimpleTransferStep(state.cache.stepCounter++));
    },
    /**
     * Updates the name attribute of a simple transfer step (specified by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} data - Contains data required to update the name attribute of the simple transfer step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new step name
     * @memberof mutations
     */
    [types.UPDATE_SIMPLE_TRANSFER_STEP_NAME](state, data) {
      findDeep(state.cache.steps, data.id).name =
        data.newValue;
    },
    /**
     * Updates the pipette attribute of a simple transfer step (specified by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} data - Contains data required to update the pipette attribute of the simple transfer step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {Object} data.newValue - The new value of the pipette object
     * @memberof mutations
     */
    [types.UPDATE_SIMPLE_TRANSFER_PIPETTE](state, data) {
      findDeep(
        state.cache.steps,
        data.id
      ).parameters.pipette_obj = data.newValue;
      findDeep(
        state.cache.steps,
        data.id
      ).parameters.pipette = data.newValue.category;
    },
    /**
     * Updates the "pipette strategy" attribute of a simple transfer step (specified by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} data - Contains data required to update the "pipette strategy" attribute of the simple transfer step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the pipette strategy
     * @memberof mutations
     */
    [types.UPDATE_SIMPLE_TRANSFER_PIPETTE_STRATEGY](state, data) {
      findDeep(
        state.cache.steps,
        data.id
      ).parameters.pipette_strategy = data.newValue;
    },
    /**
     * Updates the "tips strategy" attribute of a simple transfer step (specified by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} data - Contains data required to update the "tips strategy" attribute of the simple transfer step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the tips strategy
     * @memberof mutations
     */
    [types.UPDATE_SIMPLE_TRANSFER_TIPS_STRATEGY](state, data) {
      findDeep(
        state.cache.steps,
        data.id
      ).parameters.tipsStrategy = data.newValue;
    },
    /**
     * Updates the "liquid class" attribute of a simple transfer step (specified by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} data - Contains data required to update the "liquid class" attribute of the simple transfer step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {Object} data.value - Contains data of the liquid class to be assigned
     * @param {Number} data.value.id - The unique ID of the liquid class to be assigned
     * @param {String} data.value.name - The name of the liquid class to be assigned
     * @memberof mutations
     */
    [types.UPDATE_SIMPLE_TRANSFER_LIQUID_CLASS](state, data) {
      findDeep(
        state.cache.steps,
        data.id
      ).parameters.liquidClass = data.value.name;
      findDeep(
        state.cache.steps,
        data.id
      ).parameters.liquidClassId = data.value.id;
    },
    /**
     * Updates the "source slot" attribute of a simple transfer step (specified by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} data - Contains data required to update the "source slot" attribute of the simple transfer step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {Object} data.newValue - Contains data on the source slot to be assigned
     * @param {Number} data.newValue.id - The ID of the slot to be assigned
     * @param {String} data.newValue.name - The name of the slot to be assigned
     * @memberof mutations
     */
    [types.UPDATE_SIMPLE_TRANSFER_SOURCE_SLOT](state, data) {
      findDeep(
        state.cache.steps,
        data.id
      ).parameters.source.slot_number = data.newValue.id;
      findDeep(
        state.cache.steps,
        data.id
      ).parameters.source.slot_name = data.newValue.name;
    },
    /**
     * Updates the "source offset" attribute of a simple transfer step (specified by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} data - Contains data required to update the "source offset" attribute of the simple transfer step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {Number} data.newValue - The new value of the source offset
     * @memberof mutations
     */
    [types.UPDATE_SIMPLE_TRANSFER_SOURCE_OFFSET](state, data) {
      findDeep(
        state.cache.steps,
        data.id
      ).parameters.offset.source = data.newValue;
    },
    /**
     * Updates the "destination slot" attribute of a simple transfer step (specified by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} data - Contains data required to update the "destination slot" attribute of the simple transfer step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {Object} data.newValue - Contains data on the destination slot to be assigned
     * @param {Number} data.newValue.id - The ID of the slot to be assigned
     * @param {String} data.newValue.name - The name of the slot to be assigned
     * @memberof mutations
     */
    [types.UPDATE_SIMPLE_TRANSFER_DESTINATION_SLOT](state, data) {
      findDeep(
        state.cache.steps,
        data.id
      ).parameters.destination.slot_number = data.newValue.id;
      findDeep(
        state.cache.steps,
        data.id
      ).parameters.destination.slot_name = data.newValue.name;
    },
    /**
     * Updates the "source slot" attribute of a simple transfer step (specified by ID)
     * via propagated data from its data dependencies within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} obj - Contains data required to update the "source slot" attribute of the simple transfer step in question
     * @param {String} obj.signal - The type of the propagated dependency change
     * @param {Number} obj.sink_hash - The unique ID of the step to be updated
     * @param {Object} obj.value - Contains data on the slot object to be assigned
     * @param {String} obj.value.name - The name of the slot to be assigned
     * @param {Number} obj.value.id - The ID of the slot to be assigned
     * @memberof mutations
     */
    [types.PUSH_DEPENDENCY_LINK_CHANGE_TO_SIMPLE_TRANSFER_SOURCE_SLOT](state, obj) {
      if (obj.signal === "UPDATE") {
        findDeep(
          state.cache.steps,
          obj.sink_hash
        ).parameters.source.slot_number = obj.value.id;
        findDeep(
          state.cache.steps,
          obj.sink_hash
        ).parameters.source.slot_name = obj.value.name;
      } else if (obj.signal === "DELETE") {
        findDeep(
          state.cache.steps,
          obj.sink_hash
        ).parameters.source.slot_number = -1;
        findDeep(
          state.cache.steps,
          obj.sink_hash
        ).parameters.source.slot_name = "";
      }
    },
    /**
     * Updates the "destination slot" attribute of a simple transfer step (specified by ID)
     * via propagated data from its data dependencies within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} obj - Contains data required to update the "destination slot" attribute of the simple transfer step in question
     * @param {String} obj.signal - The type of the propagated dependency change
     * @param {Number} obj.sink_hash - The unique ID of the step to be updated
     * @param {Object} obj.value - Contains data on the slot object to be assigned
     * @param {String} obj.value.name - The name of the slot to be assigned
     * @param {Number} obj.value.id - The ID of the slot to be assigned
     * @memberof mutations
     */
    [types.PUSH_DEPENDENCY_LINK_CHANGE_TO_SIMPLE_TRANSFER_DESTINATION_SLOT](state, obj) {
      if (obj.signal === "UPDATE") {
        findDeep(
          state.cache.steps,
          obj.sink_hash
        ).parameters.destination.slot_number = obj.value.id;
        findDeep(
          state.cache.steps,
          obj.sink_hash
        ).parameters.destination.slot_name = obj.value.name;
      } else if (obj.signal === "DELETE") {
        findDeep(
          state.cache.steps,
          obj.sink_hash
        ).parameters.destination.slot_number = -1;
        findDeep(
          state.cache.steps,
          obj.sink_hash
        ).parameters.destination.slot_name = "";
      }
    },
    /**
     * Updates the "destination offset type" attribute of a simple transfer step (specified by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} data - Contains data required to update the "destination offset type" attribute of the simple transfer step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the step's destination offset type
     * @memberof mutations
     */
    [types.UPDATE_SIMPLE_TRANSFER_DESTINATION_OFFSET_TYPE](state, data) {
      findDeep(
        state.cache.steps,
        data.id
      ).parameters.offset.destination_type = data.newValue;
    },
    /**
     * Updates the "source offset type" attribute of a simple transfer step (specified by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} data - Contains data required to update the "source offset type" attribute of the simple transfer step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the step's source offset type
     * @memberof mutations
     */
    [types.UPDATE_SIMPLE_TRANSFER_SOURCE_OFFSET_TYPE](state, data) {
      findDeep(
        state.cache.steps,
        data.id
      ).parameters.offset.source_type = data.newValue;
    },
    /**
     * Updates the "liquid class" attribute of a simple transfer step (specified by ID)
     * via propagated data from its data dependencies within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} obj - Contains data required to update the "liquid class" attribute of the simple transfer step in question
     * @param {String} obj.signal - The type of the propagated dependency change
     * @param {Number} obj.sink_hash - The unique ID of the step to be updated
     * @param {Object} obj.value - Contains data on the liquid class object to be assigned
     * @param {String} obj.value.name - The name of the liquid class to be assigned
     * @param {Number} obj.value.id - The ID of the liquid class to be assigned
     * @memberof mutations
     */
    [types.PUSH_DEPENDENCY_LINK_CHANGE_TO_SIMPLE_TRANSFER_LIQUID_CLASS](state, obj) {
      if (obj.signal === "UPDATE") {
        findDeep(
          state.cache.steps,
          obj.sink_hash
        ).parameters.liquidClassId = obj.value.id;
        findDeep(
          state.cache.steps,
          obj.sink_hash
        ).parameters.liquidClass = obj.value.name;
      } else if (obj.signal === "DELETE") {
        findDeep(
          state.cache.steps,
          obj.sink_hash
        ).parameters.liquidClassId = null;
        findDeep(
          state.cache.steps,
          obj.sink_hash
        ).parameters.liquidClass = "";
      }
    },
    /**
     * Updates the "destination offset" attribute of a simple transfer step (specified by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} data - Contains data required to update the "destinatio offset" attribute of the simple transfer step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the destination offset
     * @memberof mutations
     */
    [types.UPDATE_SIMPLE_TRANSFER_DESTINATION_OFFSET](state, data) {
      findDeep(
        state.cache.steps,
        data.id
      ).parameters.offset.destination = data.newValue;
    },
    /**
     * Updates the "source wells" attribute of a simple transfer step (specified by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} data - Contains data required to update the "source wells" attribute of the simple transfer step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {Array.<String>} data.newValue - The new value of the step's source wells
     * @memberof mutations
     */
    [types.UPDATE_SIMPLE_TRANSFER_SOURCE_WELLS](state, data) {
      findDeep(
        state.cache.steps,
        data.id
      ).parameters.source.wells = data.newValue;
    },
    /**
     * Updates the "destination wells" attribute of a simple transfer step (specified by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} data - Contains data required to update the "destination wells" attribute of the simple transfer step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {Array.<String>} data.newValue - The new value of the step's destinaiton wells
     * @memberof mutations
     */
    [types.UPDATE_SIMPLE_TRANSFER_DESTINATION_WELLS](state, data) {
      findDeep(
        state.cache.steps,
        data.id
      ).parameters.destination.wells = data.newValue;
    },
    /**
     * Updates the "volumes" and "volume string" attributes of a simple transfer step (specified by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} data - Contains data required to update the "volumes" and "volume string" attributes of the simple transfer step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {Array.<Number>} data.newValue - The new value of the step's volumes
     * @memberof mutations
     */
    [types.UPDATE_SIMPLE_TRANSFER_VOLUMES](state, data) {
      findDeep(
        state.cache.steps,
        data.id
      ).parameters.volumes_string = data.newValue;
      findDeep(
        state.cache.steps,
        data.id
      ).parameters.volumes = getFloatArrayFromString(data.newValue);
    },
    /**
     * Updates the "pipette" attribute of a simple transfer step (specified by ID)
     * via propagated data from its data dependencies within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} obj - Contains data required to update the "pipette" attribute of the simple transfer step in question
     * @param {String} obj.signal - The type of the propagated dependency change
     * @param {Number} obj.sink_hash - The unique ID of the step to be updated
     * @param {Object} obj.value - Contains data on the pipette object to be assigned
     * @memberof mutations
     */
    [types.PUSH_DEPENDENCY_LINK_CHANGE_TO_SIMPLE_TRANSFER_PIPETTE](state, obj) {
      if (obj.signal === "UPDATE") {
        findDeep(
          state.cache.steps,
          obj.sink_hash
        ).parameters.pipette_obj = obj.value;
        findDeep(
          state.cache.steps,
          obj.sink_hash
        ).parameters.pipette = obj.value.category;
      } else if (obj.signal === "DELETE") {
        findDeep(
          state.cache.steps,
          obj.sink_hash
        ).parameters.pipette_obj = {};
        findDeep(
          state.cache.steps,
          obj.sink_hash
        ).parameters.pipette = "";
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
     * Commits mutations to update the "source wells" attribute of a simple transfer step (specified by ID) within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "source wells" attribute of the simple transfer step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {Array.<String>} data.newValue - The new value of the step's source wells
     * @memberof actions
     */
    [types.UPDATE_SIMPLE_TRANSFER_SOURCE_WELLS]({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_SIMPLE_TRANSFER_SOURCE_WELLS, data);
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, {root: true});
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits mutations to update the "destination wells" attribute of a simple transfer step (specified by ID) within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "destination wells" attribute of the simple transfer step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {Array.<String>} data.newValue - The new value of the step's destinaiton wells
     * @memberof actions
     */
    [types.UPDATE_SIMPLE_TRANSFER_DESTINATION_WELLS]({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_SIMPLE_TRANSFER_DESTINATION_WELLS, data);
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, {root: true});
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits mutations to update the "name" attribute of a simple transfer step (specified by ID) within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "name" attribute of the simple transfer step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new step name
     * @memberof actions
     */
    [types.UPDATE_SIMPLE_TRANSFER_STEP_NAME]({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_SIMPLE_TRANSFER_STEP_NAME, data);
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, {root: true});
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits mutations to update the "pipette" attribute of a simple transfer step (specified by ID)
     * and updates its registered data dependency objects within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "pipette" attribute of the simple transfer step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {Object} data.newValue - The new value of the pipette object
     * @memberof actions
     */
    [types.UPDATE_SIMPLE_TRANSFER_PIPETTE]({ commit, rootGetters }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_SIMPLE_TRANSFER_PIPETTE, data);
        rootGetters.cachedProtocolDependencies.filter(
          (obj) =>
            obj.sink === "transfer" &&
            obj.sink_hash === data.id &&
            obj.sink_ppty === "pipette"
        )[0].source_hash = [data.newValue.category];
        commit(types.UPDATE_CACHED_PROTOCOL_DEPENDENCY_LINKS, rootGetters.cachedProtocolDependencies,
          { root: true })
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, {root: true});
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits mutations to update the "pipette strategy" attribute of a simple transfer step (specified by ID) within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "pipette strategy" attribute of the simple transfer step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the pipette strategy
     * @memberof actions
     */
    [types.UPDATE_SIMPLE_TRANSFER_PIPETTE_STRATEGY]({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_SIMPLE_TRANSFER_PIPETTE_STRATEGY, data);
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, {root: true});
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits mutations to update the "tips strategy" attribute of a simple transfer step (specified by ID) within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "tips strategy" attribute of the simple transfer step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the tips strategy
     * @memberof actions
     */
    [types.UPDATE_SIMPLE_TRANSFER_TIPS_STRATEGY]({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_SIMPLE_TRANSFER_TIPS_STRATEGY, data);
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, {root: true});
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits mutations to update the "liquid class" attribute of a simple transfer step (specified by ID)
     * and updates its registered data dependency objects within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "liquid class" attribute of the simple transfer step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {Object} data.value - Contains data of the liquid class to be assigned
     * @param {Number} data.value.id - The unique ID of the liquid class to be assigned
     * @param {String} data.value.name - The name of the liquid class to be assigned
     * @memberof actions
     */
    [types.UPDATE_SIMPLE_TRANSFER_LIQUID_CLASS]({ commit, rootGetters }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_SIMPLE_TRANSFER_LIQUID_CLASS, data);
        rootGetters.cachedProtocolDependencies.filter(
          (obj) =>
            obj.sink === "transfer" &&
            obj.sink_hash === data.id &&
            obj.sink_ppty === "liquid_class"
        )[0].source_hash = [data.value.id];
        commit(types.UPDATE_CACHED_PROTOCOL_DEPENDENCY_LINKS, rootGetters.cachedProtocolDependencies,
          { root: true })
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, {root: true});
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits mutations to update the "destination offset type" attribute of a simple transfer step (specified by ID) within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "destinatio offset type" attribute of the simple transfer step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the step's destination offset type
     * @memberof actions
     */
    [types.UPDATE_SIMPLE_TRANSFER_DESTINATION_OFFSET_TYPE]({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_SIMPLE_TRANSFER_DESTINATION_OFFSET_TYPE, data);
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, {root: true});
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits mutations to update the "source offset type" attribute of a simple transfer step (specified by ID) within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "source offset type" attribute of the simple transfer step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the step's source offset type
     * @memberof actions
     */
    [types.UPDATE_SIMPLE_TRANSFER_SOURCE_OFFSET_TYPE]({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_SIMPLE_TRANSFER_SOURCE_OFFSET_TYPE, data);
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, {root: true});
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits mutations to update the "source slot" attribute of a simple transfer step (specified by ID)
     * and updates its registered data dependency objects within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "source slot" attribute of the simple transfer step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {Object} data.newValue - Contains data on the source slot to be assigned
     * @param {Number} data.newValue.id - The ID of the slot to be assigned
     * @param {String} data.newValue.name - The name of the slot to be assigned
     * @memberof actions
     */
    [types.UPDATE_SIMPLE_TRANSFER_SOURCE_SLOT]({ commit, rootGetters }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_SIMPLE_TRANSFER_SOURCE_SLOT, data);
        rootGetters.cachedProtocolDependencies.filter(
          (obj) =>
            obj.sink === "transfer" &&
            obj.sink_hash === data.id &&
            obj.sink_ppty === "source_slot"
        )[0].source_hash = [data.newValue.id];
        commit(types.UPDATE_CACHED_PROTOCOL_DEPENDENCY_LINKS, rootGetters.cachedProtocolDependencies,
          { root: true })
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, {root: true});
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits mutations to update the "source offset" attribute of a simple transfer step (specified by ID) within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "source offset" attribute of the simple transfer step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {Number} data.newValue - The new value of the source offset
     * @memberof actions
     */
    [types.UPDATE_SIMPLE_TRANSFER_SOURCE_OFFSET]({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_SIMPLE_TRANSFER_SOURCE_OFFSET, data);
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, {root: true});
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits mutations to update the "destination slot" attribute of a simple transfer step (specified by ID)
     * and updates its registered data dependency objects within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "destination slot" attribute of the simple transfer step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {Object} data.newValue - Contains data on the destination slot to be assigned
     * @param {Number} data.newValue.id - The ID of the slot to be assigned
     * @param {String} data.newValue.name - The name of the slot to be assigned
     * @memberof actions
     */
    [types.UPDATE_SIMPLE_TRANSFER_DESTINATION_SLOT]({ commit, rootGetters }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_SIMPLE_TRANSFER_DESTINATION_SLOT, data);
        rootGetters.cachedProtocolDependencies.filter(
          (obj) =>
            obj.sink === "transfer" &&
            obj.sink_hash === data.id &&
            obj.sink_ppty === "destination_slot"
        )[0].source_hash = [data.newValue.id];
        commit(types.UPDATE_CACHED_PROTOCOL_DEPENDENCY_LINKS, rootGetters.cachedProtocolDependencies,
          { root: true })
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, {root: true});
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits mutations to update the "destination offset" attribute of a simple transfer step (specified by ID) within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "destination offset" attribute of the simple transfer step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the step's destination offset type
     * @memberof actions
     */
    [types.UPDATE_SIMPLE_TRANSFER_DESTINATION_OFFSET]({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_SIMPLE_TRANSFER_DESTINATION_OFFSET, data);
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, {root: true});
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits mutations to update the "volumes" attribute of a simple transfer step (specified by ID) within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "volumnes" attribute of the simple transfer step in question
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {Array.<Number>} data.newValue - The new value of the step's volumes
     * @memberof actions
     */
    [types.UPDATE_SIMPLE_TRANSFER_VOLUMES]({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_SIMPLE_TRANSFER_VOLUMES, data);
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, {root: true});
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits mutations to update the "source slot" attribute of a simple transfer step (specified by ID)
     * via propagated changes from its data dependencies within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} obj - Contains data required to update the "source slot" attribute of the simple transfer step in question
     * @param {String} obj.signal - The type of the propagated dependency change
     * @param {Number} obj.sink_hash - The unique ID of the step to be updated
     * @param {Object} obj.value - Contains data on the slot object to be assigned
     * @param {String} obj.value.name - The name of the slot to be assigned
     * @param {Number} obj.value.id - The ID of the slot to be assigned
     * @memberof actions
     */
    [types.PUSH_DEPENDENCY_LINK_CHANGE_TO_SIMPLE_TRANSFER_SOURCE_SLOT]({ commit }, obj) {
      return new Promise((resolve, reject) => {
        commit(types.PUSH_DEPENDENCY_LINK_CHANGE_TO_SIMPLE_TRANSFER_SOURCE_SLOT, obj);
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits mutations to update the "destination slot" attribute of a simple transfer step (specified by ID)
     * via propagated changes from its data dependencies within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} obj - Contains data required to update the "destination slot" attribute of the simple transfer step in question
     * @param {String} obj.signal - The type of the propagated dependency change
     * @param {Number} obj.sink_hash - The unique ID of the step to be updated
     * @param {Object} obj.value - Contains data on the slot object to be assigned
     * @param {String} obj.value.name - The name of the slot to be assigned
     * @param {Number} obj.value.id - The ID of the slot to be assigned
     * @memberof actions
     */
    [types.PUSH_DEPENDENCY_LINK_CHANGE_TO_SIMPLE_TRANSFER_DESTINATION_SLOT]({ commit }, obj) {
      return new Promise((resolve, reject) => {
        commit(types.PUSH_DEPENDENCY_LINK_CHANGE_TO_SIMPLE_TRANSFER_DESTINATION_SLOT, obj);
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits mutations to update the "liquid class" attribute of a simple transfer step (specified by ID)
     * via propagated changes from its data dependencies within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} obj - Contains data required to update the "liquid class" attribute of the simple transfer step in question
     * @param {String} obj.signal - The type of the propagated dependency change
     * @param {Number} obj.sink_hash - The unique ID of the step to be updated
     * @param {Object} obj.value - Contains data on the liquid class object to be assigned
     * @param {String} obj.value.name - The name of the liquid class to be assigned
     * @param {Number} obj.value.id - The ID of the liquid class to be assigned
     * @memberof actions
     */
    [types.PUSH_DEPENDENCY_LINK_CHANGE_TO_SIMPLE_TRANSFER_LIQUID_CLASS]({ commit }, obj) {
      return new Promise((resolve, reject) => {
        commit(types.PUSH_DEPENDENCY_LINK_CHANGE_TO_SIMPLE_TRANSFER_LIQUID_CLASS, obj);
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits mutations to update the "pipette" attribute of a simple transfer step (specified by ID)
     * via propagated changes from its data dependencies within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} obj - Contains data required to update the "pipette" attribute of the simple transfer step in question
     * @param {String} obj.signal - The type of the propagated dependency change
     * @param {Number} obj.sink_hash - The unique ID of the step to be updated
     * @param {Object} obj.value - Contains data on the pipette object to be assigned
     * @memberof actions
     */
    [types.PUSH_DEPENDENCY_LINK_CHANGE_TO_SIMPLE_TRANSFER_PIPETTE]({ commit }, obj) {
      return new Promise((resolve, reject) => {
        commit(types.PUSH_DEPENDENCY_LINK_CHANGE_TO_SIMPLE_TRANSFER_PIPETTE, obj);
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
    [types.LOAD_SIMPLE_TRANSFER_DEPENDENCY_LINKS]({ commit }, step) {
      return new Promise((resolve, reject) => {
        commit(
          types.ADD_CACHED_PROTOCOL_DEPENDENCY_LINK,
          {
            sink: "transfer",
            sink_hash: step.id,
            sink_ppty: "source_slot",
            source: "slot",
            source_hash: [step.parameters.source.slot_number],
            atype: types.PUSH_DEPENDENCY_LINK_CHANGE_TO_SIMPLE_TRANSFER_SOURCE_SLOT,
          },
          { root: true }
        );
        commit(
          types.ADD_CACHED_PROTOCOL_DEPENDENCY_LINK,
          {
            sink: "transfer",
            sink_hash: step.id,
            sink_ppty: "destination_slot",
            source: "slot",
            source_hash: [step.parameters.destination.slot_number],
            atype: types.PUSH_DEPENDENCY_LINK_CHANGE_TO_SIMPLE_TRANSFER_DESTINATION_SLOT,
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
            atype: types.PUSH_DEPENDENCY_LINK_CHANGE_TO_SIMPLE_TRANSFER_LIQUID_CLASS,
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
            atype: types.PUSH_DEPENDENCY_LINK_CHANGE_TO_SIMPLE_TRANSFER_PIPETTE,
          },
          { root: true }
        );
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits a mutation that creates a simple transfer step and registers representations of its data dependencies
     * with other attributes of the parent protocol within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @memberof actions
     */
    [types.CREATE_SIMPLE_TRANSFER_STEP]({ state, commit }) {
      return new Promise((resolve, reject) => {
        commit(types.CREATE_SIMPLE_TRANSFER_STEP);
        commit(
          types.ADD_CACHED_PROTOCOL_DEPENDENCY_LINK,
          {
            sink: "transfer",
            sink_hash: state.cache.stepCounter-1,
            sink_ppty: "source_slot",
            source: "slot",
            source_hash: [],
            atype: types.PUSH_DEPENDENCY_LINK_CHANGE_TO_SIMPLE_TRANSFER_SOURCE_SLOT,
          },
          { root: true }
        );
        commit(
          types.ADD_CACHED_PROTOCOL_DEPENDENCY_LINK,
          {
            sink: "transfer",
            sink_hash: state.cache.stepCounter-1,
            sink_ppty: "destination_slot",
            source: "slot",
            source_hash: [],
            atype: types.PUSH_DEPENDENCY_LINK_CHANGE_TO_SIMPLE_TRANSFER_DESTINATION_SLOT,
          },
          { root: true }
        );
        commit(
          types.ADD_CACHED_PROTOCOL_DEPENDENCY_LINK,
          {
            sink: "transfer",
            sink_hash: state.cache.stepCounter-1,
            sink_ppty: "liquid_class",
            source: "liquidClass",
            source_hash: [0],
            atype: types.PUSH_DEPENDENCY_LINK_CHANGE_TO_SIMPLE_TRANSFER_LIQUID_CLASS,
          },
          { root: true }
        );
        commit(
          types.ADD_CACHED_PROTOCOL_DEPENDENCY_LINK,
          {
            sink: "transfer",
            sink_hash: state.cache.stepCounter-1,
            sink_ppty: "pipette",
            source: "pipette",
            source_hash: [],
            atype: types.PUSH_DEPENDENCY_LINK_CHANGE_TO_SIMPLE_TRANSFER_PIPETTE,
          },
          { root: true }
        );
        resolve();
        reject(new Error("…"));
      });
    },
  },
};
