// Please note: this module is not to be used as a Vuex store module
// Instead mutations and actions here are used to populate those of an actual Vuex store module

import types from "../../../../types";
import { findDeep } from "../../../../utils";
import { getNewArrayTransferStep } from "../../../defaultData/stepsData";

export default {
  /**
   * Mutations for the Vuex state
   * @type {object}
   * @namespace mutations
   */
  mutations: {
    /**
     * Creates an array transfer step within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @memberof mutations
     */
    [types.CREATE_ARRAY_TRANSFER_STEP](state) {
      state.cache.steps.push(
        getNewArrayTransferStep(state.cache.stepCounter++)
      );
    },
    /**
     * Updates the name attribute of an array transfer step (selected by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} data - Contains new value for the name attribute of an array transfer step (selected by ID)
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new step name
     * @memberof mutations
     */
    [types.UPDATE_ARRAY_TRANSFER_STEP_NAME](state, data) {
      findDeep(state.cache.steps, data.id).name = data.newValue;
    },
    /**
     * Updates the pipette attribute of an array transfer step (selected by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} data - Contains new value for the pipette attribute of an array transfer step (selected by ID)
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {Object} data.newValue - The new value of the pipette object
     * @memberof mutations
     */
    [types.UPDATE_ARRAY_TRANSFER_PIPETTE](state, data) {
      findDeep(state.cache.steps, data.id).parameters.pipette_obj =
        data.newValue;
      findDeep(state.cache.steps, data.id).parameters.pipette =
        data.newValue.category;
    },
    /**
     * Updates the pipette strategy attribute of an array transfer step (selected by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} data - Contains new value for the pipette strategy attribute of an array transfer step (selected by ID)
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the pipette strategy
     * @memberof mutations
     */
    [types.UPDATE_ARRAY_TRANSFER_PIPETTE_STRATEGY](state, data) {
      findDeep(state.cache.steps, data.id).parameters.pipette_strategy =
        data.newValue;
    },
    /**
     * Updates the tips strategy attribute of an array transfer step (selected by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} data - Contains new value for the tips strategy attribute of an array transfer step (selected by ID)
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the tips strategy
     * @memberof mutations
     */
    [types.UPDATE_ARRAY_TRANSFER_TIPS_STRATEGY](state, data) {
      findDeep(state.cache.steps, data.id).parameters.tipsStrategy =
        data.newValue;
    },
    /**
     * Updates the liquid class attribute of an array transfer step (selected by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} data - Contains new value for the liquid class attribute of an array transfer step (selected by ID)
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {Object} data.value - Contains data of the liquid class to be assigned
     * @param {Number} data.value.id - The unique ID of the liquid class to be assigned
     * @param {String} data.value.name - The name of the liquid class to be assigned
     * @memberof mutations
     */
    [types.UPDATE_ARRAY_TRANSFER_LIQUID_CLASS](state, data) {
      findDeep(state.cache.steps, data.id).parameters.liquidClass =
        data.value.name;
      findDeep(state.cache.steps, data.id).parameters.liquidClassId =
        data.value.id;
    },
    /**
     * Updates the destination offset type attribute of an array transfer step (selected by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} data - Contains new value for the destination offset type attribute of an array transfer step (selected by ID)
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the step's destination type
     * @memberof mutations
     */
    [types.UPDATE_ARRAY_TRANSFER_DESTINATION_OFFSET_TYPE](state, data) {
      findDeep(state.cache.steps, data.id).parameters.offset.destination_type =
        data.newValue;
    },
    /**
     * Updates the source offset type attribute of an array transfer step (selected by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} data - Contains new value for the source offset type attribute of an array transfer step (selected by ID)
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the step's source type
     * @memberof mutations
     */
    [types.UPDATE_ARRAY_TRANSFER_SOURCE_OFFSET_TYPE](state, data) {
      findDeep(state.cache.steps, data.id).parameters.offset.source_type =
        data.newValue;
    },
    /**
     * Updates the "source var map" attribute via propagated changes from data dependencies within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} obj - Contains data required to propagate changes to the "source var map" attribute from data dependencies
     * @param {String} obj.signal - The type of the propagated dependency change
     * @param {String} obj.sink_ppty - The property of the step to be updated
     * @param {Number} obj.sink_hash - The unique ID of the step to be updated
     * @param {Object} obj.value - Contains data on the slot object to be assigned
     * @param {String} obj.value.name - The name of the slot to be assigned
     * @param {Number} obj.value.id - The ID of the slot to be assigned
     * @memberof mutations
     */
    [types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_ARRAY_TRANSFER_SOURCE_VAR_MAP_SLOT](state, obj) {
      const source_var = obj.sink_ppty.split("::")[1];

      if (obj.signal === "UPDATE") {
        findDeep(state.cache.steps, obj.sink_hash).parameters.source_var_map[
          source_var
        ].slot_number = obj.value.id;
        findDeep(state.cache.steps, obj.sink_hash).parameters.source_var_map[
          source_var
        ].slot_name = obj.value.name;
      } else if (obj.signal === "DELETE") {
        findDeep(state.cache.steps, obj.sink_hash).parameters.source_var_map[
          source_var
        ].slot_number = -1;
        findDeep(state.cache.steps, obj.sink_hash).parameters.source_var_map[
          source_var
        ].slot_name = "";
      }
    },
    /**
     * Updates the "destination var map" attribute via propagated changes from data dependencies within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} obj - Contains data required to propagate changes to the "destination var map" attribute from data dependencies
     * @param {String} obj.signal - The type of the propagated dependency change
     * @param {String} obj.sink_ppty - The property of the step to be updated
     * @param {Number} obj.sink_hash - The unique ID of the step to be updated
     * @param {Object} obj.value - Contains data on the slot object to be assigned
     * @param {String} obj.value.name - The name of the slot to be assigned
     * @param {Number} obj.value.id - The ID of the slot to be assigned
     * @memberof mutations
     */
    [types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_ARRAY_TRANSFER_DESTINATION_VAR_MAP_SLOT](state, obj) {
      const destination_var = obj.sink_ppty.split("::")[1];

      if (obj.signal === "UPDATE") {
        findDeep(
          state.cache.steps,
          obj.sink_hash
        ).parameters.destination_var_map[destination_var].slot_number =
          obj.value.id;
        findDeep(
          state.cache.steps,
          obj.sink_hash
        ).parameters.destination_var_map[destination_var].slot_name =
          obj.value.name;
      } else if (obj.signal === "DELETE") {
        findDeep(
          state.cache.steps,
          obj.sink_hash
        ).parameters.destination_var_map[destination_var].slot_number = -1;
        findDeep(
          state.cache.steps,
          obj.sink_hash
        ).parameters.destination_var_map[destination_var].slot_name = "";
      }
    },
    /**
     * Updates the "array map filename" attribute of an array transfer step (selected by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} data - Contains new value for the "array map filename" attribute of an array transfer step (selected by ID)
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the step's array map filename
     * @memberof mutations
     */
    [types.UPDATE_ARRAY_MAP_FILENAME](state, data) {
      findDeep(state.cache.steps, data.id).parameters.array_map_filename =
        data.newValue;
    },
    /**
     * Updates the "mapping complete" attribute of an array transfer step (selected by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} data - Contains the ID of the array transfer step
     * @param {Number} data.id - The unique ID of the step to be updated
     * @memberof mutations
     */
    [types.CHECK_FOR_MAP_COMPLETENESS](state, data) {
      let sourceHash = findDeep(state.cache.steps, data.id).parameters
        .source_var_map;
      let destinationHash = findDeep(state.cache.steps, data.id).parameters
        .destination_var_map;
      let isComplete = true;

      for (let obj of Object.values(sourceHash)) {
        if (obj.slot_number === -1 || obj.wells.length === 0)
          isComplete = false;
      }

      for (let obj of Object.values(destinationHash)) {
        if (obj.slot_number === -1) isComplete = false;
      }

      if (isComplete)
        findDeep(state.cache.steps, data.id).parameters.hasMapConflict = false;

      findDeep(
        state.cache.steps,
        data.id
      ).parameters.mappingComplete = isComplete;
    },
    /**
     * Updates the "source var map" attribute of an array transfer step (selected by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} data - Contains new value for the "source var map" attribute of an array transfer step (selected by ID)
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {Array} data.newValue - The new value of the step's array source var map
     * @memberof mutations
     */
    [types.UPDATE_ARRAY_SOURCE_VAR_MAP](state, data) {
      const content = data.newValue.filter((item) => item[0].length > 0);
      let hash_map = findDeep(state.cache.steps, data.id).parameters
        .source_var_map;
      findDeep(state.cache.steps, data.id).parameters.hasMapConflict = false;

      for (let item of content[0].slice(3)) {
        if (item.length) {
          if (!Object.keys(hash_map).includes(item)) {
            hash_map[item] = {
              slot_name: "",
              slot_number: -1,
              wells: [],
              destinations: {},
            };
            findDeep(
              state.cache.steps,
              data.id
            ).parameters.hasMapConflict = true;
          }
        }
      }

      for (let item of Object.keys(hash_map)) {
        if (!content[0].slice(3).includes(item)) {
          delete hash_map[item];
        }
      }
    },
    /**
     * Updates the "destination var map" attribute of an array transfer step (selected by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} data - Contains new value for the "destination var map" attribute of an array transfer step (selected by ID)
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {Array} data.newValue - The new value of the step's destination var map
     * @memberof mutations
     */
    [types.UPDATE_ARRAY_DESTINATION_VAR_MAP](state, data) {
      const content = data.newValue.filter((item) => item[0].length > 0);
      let hash_map = findDeep(state.cache.steps, data.id).parameters
        .destination_var_map;
      let source_hash_map = findDeep(state.cache.steps, data.id).parameters
        .source_var_map;
      findDeep(state.cache.steps, data.id).parameters.hasMapConflict = false;

      for (let row of content.slice(1)) {
        if (row[0].length) {
          if (!Object.keys(hash_map).includes(row[0])) {
            hash_map[row[0]] = {
              slot_name: "",
              slot_number: -1,
            };
            findDeep(
              state.cache.steps,
              data.id
            ).parameters.hasMapConflict = true;
          }
        }

        for (let idx = 3; idx < row.length; idx++) {
          if (content[0][idx].length) {
            if (
              !Object.keys(
                source_hash_map[content[0][idx]].destinations
              ).includes(row[0])
            ) {
              source_hash_map[content[0][idx]].destinations[row[0]] = {
                volumes: [],
                wells: [],
              };
            }
            source_hash_map[content[0][idx]].destinations[row[0]].volumes.push(
              row[idx]
            );
            source_hash_map[content[0][idx]].destinations[row[0]].wells.push(
              row[1]
            );
          }
        }
      }

      for (let item of Object.keys(hash_map)) {
        if (
          !content
            .slice(1)
            .map((i) => i[0])
            .includes(item)
        ) {
          delete hash_map[item];
          for (let value of Object.values(source_hash_map)) {
            delete value.destinations[item];
          }
        }
      }
    },
    /**
     * Updates the "source slot" attribute of an array transfer step (selected by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} obj - Contains new value for the "source slot" attribute of an array transfer step (selected by ID)
     * @param {Number} obj.id - The ID of the step to be updated
     * @param {String} obj.sourceName - The key within the source var map whose corresponding value is to be updated
     * @param {Number} obj.data.name - The new slot name to be assigned
     * @param {Number} obj.data.id - The new slot ID to be assigned
     * @memberof mutations
     */
    [types.UPDATE_ARRAY_MAP_SOURCE_VARIABLE_LABWARE](state, obj) {
      findDeep(state.cache.steps, obj.id).parameters.source_var_map[
        obj.sourceName
      ].slot_name = obj.data.name;
      findDeep(state.cache.steps, obj.id).parameters.source_var_map[
        obj.sourceName
      ].slot_number = obj.data.id;
    },
    /**
     * Updates the "source offset" attribute of an array transfer step (selected by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} data - Contains new value for the "source offset" attribute of an array transfer step (selected by ID)
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the step's source offset
     * @memberof mutations
     */
    [types.UPDATE_ARRAY_TRANSFER_SOURCE_OFFSET](state, data) {
      findDeep(state.cache.steps, data.id).parameters.offset.source =
        data.newValue;
    },
    /**
     * Updates the "destination offset" attribute of an array transfer step (selected by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} data - Contains new value for the "destination offset" attribute of an array transfer step (selected by ID)
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the step's destination offset
     * @memberof mutations
     */
    [types.UPDATE_ARRAY_TRANSFER_DESTINATION_OFFSET](state, data) {
      findDeep(state.cache.steps, data.id).parameters.offset.destination =
        data.newValue;
    },
    /**
     * Updates the "source wells" attribute of an array transfer step (selected by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} obj - Contains new value for the "source wells" attribute of an array transfer step (selected by ID)
     * @param {Number} obj.id - The ID of the step to be updated
     * @param {String} obj.sourceName - The key within the source var map whose corresponding value is to be updated
     * @param {Array.<String>} obj.data - The new value of the wells attribute
     * @memberof mutations
     */
    [types.UPDATE_ARRAY_SOURCE_WELLS](state, obj) {
      findDeep(state.cache.steps, obj.id).parameters.source_var_map[
        obj.sourceName
      ].wells = obj.data;
    },
    /**
     * Updates the "destination slot" attribute of an array transfer step (selected by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} obj - Contains new value for the "destination slot" attribute of an array transfer step (selected by ID)
     * @param {Number} obj.id - The ID of the step to be updated
     * @param {String} obj.destinationName - The key within the source var map whose corresponding value is to be updated
     * @param {Number} obj.data.name - The new slot name to be assigned
     * @param {Number} obj.data.id - The new slot ID to be assigned
     * @memberof mutations
     */
    [types.UPDATE_ARRAY_MAP_DESTINATION_VARIABLE_LABWARE](state, obj) {
      findDeep(state.cache.steps, obj.id).parameters.destination_var_map[
        obj.destinationName
      ].slot_name = obj.data.name;
      findDeep(state.cache.steps, obj.id).parameters.destination_var_map[
        obj.destinationName
      ].slot_number = obj.data.id;
    },
    /**
     * Updates the "array map" attribute of an array transfer step (selected by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} data - Contains new value for the "array map" attribute of an array transfer step (selected by ID)
     * @param {Number} data.id - The unique ID of the step to be updated
     * @memberof mutations
     */
    [types.UPDATE_ARRAY_MAP](state, data) {
      let source_hash_map = findDeep(state.cache.steps, data.id).parameters
        .source_var_map;
      let destination_hash_map = findDeep(state.cache.steps, data.id).parameters
        .destination_var_map;
      let res = [];

      for (let source_data of Object.values(source_hash_map)) {
        for (let [destination, destination_data] of Object.entries(
          source_data.destinations
        )) {
          for (let source_well of source_data.wells) {
            for (let idx = 0; idx < destination_data.volumes.length; idx++) {
              res.push([
                source_data.slot_name,
                source_well,
                destination_hash_map[destination].slot_name,
                destination_data.wells[idx],
                destination_data.volumes[idx],
              ]);
            }
          }
        }
      }
      findDeep(state.cache.steps, data.id).parameters.array_map = res;
    },
    /**
     * Updates the "liquid class" attribute of an array transfer step (selected by ID) via changes propagated from data
     * dependencies within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} obj - Contains new value for the "source offset" attribute of an array transfer step (selected by ID)
     * @param {String} obj.signal - The type of the propagated dependency change
     * @param {Number} obj.sink_hash - The unique ID of the step to be updated
     * @param {Object} obj.value - Contains data on the liquid class object to be assigned
     * @param {String} obj.value.name - The name of the liquid class to be assigned
     * @param {Number} obj.value.id - The ID of the liquid class to be assigned
     * @memberof mutations
     */
    [types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_ARRAY_TRANSFER_LIQUID_CLASS](state, obj) {
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
     * Updates the pipette attribute of an array transfer step (selected by ID) via changes propagated from data
     * dependencies within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the step module
     * @param {Object} obj - Contains new value for the pipette attribute of an array transfer step (selected by ID)
     * @param {String} obj.signal - The type of the propagated dependency change
     * @param {Number} obj.sink_hash - The unique ID of the step to be updated
     * @param {Object} obj.value - Contains data on the pipette object to be assigned
     * @memberof mutations
     */
    [types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_ARRAY_TRANSFER_PIPETTE](state, obj) {
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
     * Commits a mutation that updates the name attribute of the array transfer step (specified by ID) within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the name attribute of the array transfer step (specified by ID)
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new step name
     * @memberof actions
     */
    [types.UPDATE_ARRAY_TRANSFER_STEP_NAME]({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_ARRAY_TRANSFER_STEP_NAME, data);
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits a mutation that updates the pipette attribute of the array transfer step (specified by ID) 
     * and registers representations of its data depenndencies within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the pipette attribute of the array transfer step (specified by ID)
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {Object} data.newValue - The new value of the pipette object
     * @memberof actions
     */
    [types.UPDATE_ARRAY_TRANSFER_PIPETTE]({ commit, rootGetters }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_ARRAY_TRANSFER_PIPETTE, data);
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
     * Commits a mutation that updates the "destination offset type" attribute of the array transfer step (specified by ID) within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "destination offset type" attribute of the array transfer step (specified by ID)
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the step's destination type
     * @memberof actions
     */
    [types.UPDATE_ARRAY_TRANSFER_DESTINATION_OFFSET_TYPE]({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_ARRAY_TRANSFER_DESTINATION_OFFSET_TYPE, data);
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits a mutation that updates the "source offset type" attribute of the array transfer step (specified by ID) within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "source offset type" attribute of the array transfer step (specified by ID)
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the step's source type
     * @memberof actions
     */
    [types.UPDATE_ARRAY_TRANSFER_SOURCE_OFFSET_TYPE]({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_ARRAY_TRANSFER_SOURCE_OFFSET_TYPE, data);
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits a mutation that updates the "pipette strategy" attribute of the array transfer step (specified by ID) within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "pipette strategy" attribute of the array transfer step (specified by ID)
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the pipette strategy
     * @memberof actions
     */
    [types.UPDATE_ARRAY_TRANSFER_PIPETTE_STRATEGY]({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_ARRAY_TRANSFER_PIPETTE_STRATEGY, data);
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits a mutation that updates the "tips strategy" attribute of the array transfer step (specified by ID) within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "tips strategy" attribute of the array transfer step (specified by ID)
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the tips strategy
     * @memberof actions
     */
    [types.UPDATE_ARRAY_TRANSFER_TIPS_STRATEGY]({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_ARRAY_TRANSFER_TIPS_STRATEGY, data);
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits a mutation that updates the "source var map" attribute of the array transfer step (specified by ID) 
     * via changes propagated by data dependencies within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} obj - Contains data required to update the "source var map" attribute of the array transfer step (specified by ID)
     * @param {String} obj.signal - The type of the propagated dependency change
     * @param {String} obj.sink_ppty - The property of the step to be updated
     * @param {Number} obj.sink_hash - The unique ID of the step to be updated
     * @param {Object} obj.value - Contains data on the slot object to be assigned
     * @param {String} obj.value.name - The name of the slot to be assigned
     * @param {Number} obj.value.id - The ID of the slot to be assigned
     * @memberof actions
     */
    [types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_ARRAY_TRANSFER_SOURCE_VAR_MAP_SLOT]({ commit }, obj) {
      return new Promise((resolve, reject) => {
        commit(types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_ARRAY_TRANSFER_SOURCE_VAR_MAP_SLOT, obj);
        commit(types.UPDATE_ARRAY_MAP, {
          id: obj.sink_hash,
        });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits a mutation that updates the "destination var map" attribute of the array transfer step (specified by ID) 
     * via changes propagated by data dependencies within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "destination var map" attribute of the array transfer step (specified by ID)
     * @param {String} obj.signal - The type of the propagated dependency change
     * @param {String} obj.sink_ppty - The property of the step to be updated
     * @param {Number} obj.sink_hash - The unique ID of the step to be updated
     * @param {Object} obj.value - Contains data on the slot object to be assigned
     * @param {String} obj.value.name - The name of the slot to be assigned
     * @param {Number} obj.value.id - The ID of the slot to be assigned
     * @memberof actions
     */
    [types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_ARRAY_TRANSFER_DESTINATION_VAR_MAP_SLOT](
      { commit },
      obj
    ) {
      return new Promise((resolve, reject) => {
        commit(types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_ARRAY_TRANSFER_DESTINATION_VAR_MAP_SLOT, obj);
        commit(types.UPDATE_ARRAY_MAP, {
          id: obj.sink_hash,
        });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits a mutation that updates the "liquid class" attribute of the array transfer step (specified by ID)
     * and registers representations of its data dependencies within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "liquid class" attribute of the array transfer step (specified by ID)
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {Object} data.value - Contains data of the liquid class to be assigned
     * @param {Number} data.value.id - The unique ID of the liquid class to be assigned
     * @param {String} data.value.name - The name of the liquid class to be assigned
     * @memberof actions
     */
    [types.UPDATE_ARRAY_TRANSFER_LIQUID_CLASS]({ commit, rootGetters }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_ARRAY_TRANSFER_LIQUID_CLASS, data);
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
     * Commits a mutation that updates the "array map filename" attribute of the array transfer step (specified by ID) within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "array map filename" attribute of the array transfer step (specified by ID)
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the step's array map filename
     * @memberof actions
     */
    [types.UPDATE_ARRAY_MAP_FILENAME]({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_ARRAY_MAP_FILENAME, data);
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits a mutation that updates the "array map" attribute of the array transfer step (specified by ID) within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "array map" attribute of the array transfer step (specified by ID)
     * @param {Number} data.id - The unique ID of the step to be updated
     * @memberof actions
     */
    [types.UPDATE_ARRAY_MAP]({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_ARRAY_MAP, data);
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits mutations that updates the "array map parsed file", "source var map", "destination var map", and "array map" attributes
     * of the array transfer step (specified by ID) and registers representations of their data dependencies within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "array map parsed file" attribute of the array transfer step (specified by ID)
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {Array} data.newValue - The new value of the step's array source var map
     * @memberof actions
     */
    [types.UPDATE_ARRAY_MAP_PARSED_FILE](
      { commit, rootGetters, state },
      data
    ) {
      return new Promise((resolve, reject) => {
        let step = findDeep(state.cache.steps, data.id);
        const initialSourceVars = Object.keys(step.parameters.source_var_map);
        const initialDestinationVars = Object.keys(
          step.parameters.destination_var_map
        );

        commit(types.UPDATE_ARRAY_SOURCE_VAR_MAP, data);
        commit(types.UPDATE_ARRAY_DESTINATION_VAR_MAP, data);
        commit(types.UPDATE_ARRAY_MAP, data);

        for (let [source_var, obj] of Object.entries(
          step.parameters.source_var_map
        )) {
          if (!initialSourceVars.includes(source_var)) {
            commit(
              types.ADD_CACHED_PROTOCOL_DEPENDENCY_LINK,
              {
                sink: "transfer",
                sink_hash: step.id,
                sink_ppty: `source_var_map::${source_var}`,
                source: "slot",
                source_hash: [obj.slot_number],
                atype: types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_ARRAY_TRANSFER_SOURCE_VAR_MAP_SLOT,
              },
              { root: true }
            );
          }
        }

        for (let [destination_var, obj] of Object.entries(
          step.parameters.destination_var_map
        )) {
          if (!initialDestinationVars.includes(destination_var)) {
            commit(
              types.ADD_CACHED_PROTOCOL_DEPENDENCY_LINK,
              {
                sink: "transfer",
                sink_hash: step.id,
                sink_ppty: `destination_var_map::${destination_var}`,
                source: "slot",
                source_hash: [obj.slot_number],
                atype:
                  types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_ARRAY_TRANSFER_DESTINATION_VAR_MAP_SLOT,
              },
              { root: true }
            );
          }
        }

        for (let source_var of initialSourceVars) {
          if (
            !Object.keys(step.parameters.source_var_map).includes(source_var)
          ) {
            commit(
              types.UPDATE_CACHED_PROTOCOL_DEPENDENCY_LINKS,
              rootGetters.cachedProtocolDependencies.filter(
                (obj) =>
                  !(
                    obj.sink === "transfer" &&
                    obj.sink_hash === data.id &&
                    obj.sink_ppty === `source_var_map::${source_var}`
                  )
              ),
              { root: true }
            );
          }
        }

        for (let destination_var of initialDestinationVars) {
          if (
            !Object.keys(step.parameters.destination_var_map).includes(
              destination_var
            )
          ) {
            commit(
              types.UPDATE_CACHED_PROTOCOL_DEPENDENCY_LINKS,
              rootGetters.cachedProtocolDependencies.filter(
                (obj) =>
                  !(
                    obj.sink === "transfer" &&
                    obj.sink_hash === data.id &&
                    obj.sink_ppty === `destination_var_map::${destination_var}`
                  )
              ),
              { root: true }
            );
          }
        }

        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits a mutation that updates the "source offset" attribute of the array transfer step (specified by ID) within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "source offset" attribute of the array transfer step (specified by ID)
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the step's source offset
     * @memberof actions
     */
    [types.UPDATE_ARRAY_TRANSFER_SOURCE_OFFSET]({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_ARRAY_TRANSFER_SOURCE_OFFSET, data);
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits a mutation that updates the "destination offset" attribute of the array transfer step (specified by ID) within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "destination offset" attribute of the array transfer step (specified by ID)
     * @param {Number} data.id - The unique ID of the step to be updated
     * @param {String} data.newValue - The new value of the step's destination offset
     * @memberof actions
     */
    [types.UPDATE_ARRAY_TRANSFER_DESTINATION_OFFSET]({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_ARRAY_TRANSFER_DESTINATION_OFFSET, data);
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits a mutation that updates the "liquid class" attribute of the array transfer step (specified by ID)
     * via propagated changed from its data dependencies within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} obj - Contains data required to update the "liquid class" attribute of the array transfer step (specified by ID)
     * @param {String} obj.signal - The type of the propagated dependency change
     * @param {Number} obj.sink_hash - The unique ID of the step to be updated
     * @param {Object} obj.value - Contains data on the liquid class object to be assigned
     * @param {String} obj.value.name - The name of the liquid class to be assigned
     * @param {Number} obj.value.id - The ID of the liquid class to be assigned
     * @memberof actions
     */
    [types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_ARRAY_TRANSFER_LIQUID_CLASS]({ commit }, obj) {
      return new Promise((resolve, reject) => {
        commit(types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_ARRAY_TRANSFER_LIQUID_CLASS, obj);
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits a mutation that updates the "source slot" attribute of the array transfer step (specified by ID) within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} obj - Contains data required to update the "source slot" attribute of the array transfer step (specified by ID)
     * @param {Number} obj.id - The ID of the step to be updated
     * @param {String} obj.sourceName - The key within the source var map whose corresponding value is to be updated
     * @param {Number} obj.data.name - The new slot name to be assigned
     * @param {Number} obj.data.id - The new slot ID to be assigned
     * @memberof actions
     */
    [types.UPDATE_ARRAY_MAP_SOURCE_VARIABLE_LABWARE]({ commit, rootGetters }, obj) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_ARRAY_MAP_SOURCE_VARIABLE_LABWARE, obj);
        commit(types.CHECK_FOR_MAP_COMPLETENESS, obj);
        rootGetters.cachedProtocolDependencies.filter(
          (obj_) =>
            obj_.sink === "transfer" &&
            obj_.sink_hash === obj.id &&
            obj_.sink_ppty === `source_var_map::${obj.sourceName}`
        )[0].source_hash = [obj.data.id];
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
     * Commits a mutation that updates the "destination slot" attribute of the array transfer step (specified by ID) within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} obj - Contains data required to update the "destination slot" attribute of the array transfer step (specified by ID)
     * @param {Number} obj.id - The ID of the step to be updated
     * @param {String} obj.destinationName - The key within the source var map whose corresponding value is to be updated
     * @param {Number} obj.data.name - The new slot name to be assigned
     * @param {Number} obj.data.id - The new slot ID to be assigned
     * @memberof actions
     */
    [types.UPDATE_ARRAY_MAP_DESTINATION_VARIABLE_LABWARE]({ commit, rootGetters }, obj) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_ARRAY_MAP_DESTINATION_VARIABLE_LABWARE, obj);
        commit(types.CHECK_FOR_MAP_COMPLETENESS, obj);
        rootGetters.cachedProtocolDependencies.filter(
          (obj_) =>
            obj_.sink === "transfer" &&
            obj_.sink_hash === obj.id &&
            obj_.sink_ppty === `destination_var_map::${obj.destinationName}`
        )[0].source_hash = [obj.data.id];
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
     * Commits a mutation that updates the "source wells" attribute of the array transfer step (specified by ID) within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} obj - Contains data required to update the "source wells" attribute of the array transfer step (specified by ID)
     * @param {Number} obj.id - The ID of the step to be updated
     * @param {String} obj.sourceName - The key within the source var map whose corresponding value is to be updated
     * @param {Array.<String>} obj.data - The new value of the wells attribute
     * @memberof actions
     */
    [types.UPDATE_ARRAY_SOURCE_WELLS]({ commit }, obj) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_ARRAY_SOURCE_WELLS, obj);
        commit(types.CHECK_FOR_MAP_COMPLETENESS, obj);
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits a mutation that updates the pipette attribute of the array transfer step (specified by ID)
     * via changes propagated by its data dependencies within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} obj - Contains data required to update the pipette attribute of the array transfer step (specified by ID)
     * @param {String} obj.signal - The type of the propagated dependency change
     * @param {Number} obj.sink_hash - The unique ID of the step to be updated
     * @param {Object} obj.value - Contains data on the pipette object to be assigned
     * @memberof actions
     */
    [types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_ARRAY_TRANSFER_PIPETTE]({ commit }, obj) {
      return new Promise((resolve, reject) => {
        commit(types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_ARRAY_TRANSFER_PIPETTE, obj);
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
    [types.LOAD_ARRAY_TRANSFER_DEPENDENCY_LINKS]({ commit }, step) {
      return new Promise((resolve, reject) => {
        commit(
          types.ADD_CACHED_PROTOCOL_DEPENDENCY_LINK,
          {
            sink: "transfer",
            sink_hash: step.id,
            sink_ppty: "liquid_class",
            source: "liquidClass",
            source_hash: [step.parameters.liquidClassId],
            atype: types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_ARRAY_TRANSFER_LIQUID_CLASS,
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
            atype: types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_ARRAY_TRANSFER_PIPETTE,
          },
          { root: true }
        );

        for (let [source_var, obj] of Object.entries(
          step.parameters.source_var_map
        )) {
          commit(
            types.ADD_CACHED_PROTOCOL_DEPENDENCY_LINK,
            {
              sink: "transfer",
              sink_hash: step.id,
              sink_ppty: `source_var_map::${source_var}`,
              source: "slot",
              source_hash: [obj.slot_number],
              atype: types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_ARRAY_TRANSFER_SOURCE_VAR_MAP_SLOT,
            },
            { root: true }
          );
        }

        for (let [destination_var, obj] of Object.entries(
          step.parameters.destination_var_map
        )) {
          commit(
            types.ADD_CACHED_PROTOCOL_DEPENDENCY_LINK,
            {
              sink: "transfer",
              sink_hash: step.id,
              sink_ppty: `destination_var_map::${destination_var}`,
              source: "slot",
              source_hash: [obj.slot_number],
              atype: types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_ARRAY_TRANSFER_DESTINATION_VAR_MAP_SLOT,
            },
            { root: true }
          );
        }

        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits a mutation that creates an array transfer step and registers representations of its data dependencies
     * with other attributes of the parent protocol within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @memberof actions
     */
    [types.CREATE_ARRAY_TRANSFER_STEP]({ state, commit }) {
      return new Promise((resolve, reject) => {
        commit(types.CREATE_ARRAY_TRANSFER_STEP);
        commit(
          types.ADD_CACHED_PROTOCOL_DEPENDENCY_LINK,
          {
            sink: "transfer",
            sink_hash: state.cache.stepCounter - 1,
            sink_ppty: "liquid_class",
            source: "liquidClass",
            source_hash: [0],
            atype: types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_ARRAY_TRANSFER_LIQUID_CLASS,
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
            atype: types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_ARRAY_TRANSFER_PIPETTE,
          },
          { root: true }
        );
        resolve();
        reject(new Error("…"));
      });
    },
  },
};
