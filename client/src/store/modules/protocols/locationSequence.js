import types from "../../../types";
import {
  getNewSequence,
  getNewSequenceLocation,
} from "../../defaultData/sequencesData";

export default {
  /**
   * @returns {object} - The Vuex state
   * @namespace state
   */
  state: () => ({
    /**
     * Stores data related to location-sequence-related views and forms
     * @memberof state
     * @property {String} locSeqID - Stores the index of the chosen location sequence card in the UI
     * @property {String} locSeqCategory - Stores the category of the selected card in the UI (location || location sequence)
     */
    vars: {
      locSeqID: -1,
      locSeqCategory: "",
    },
    /**
     * Serves as a cache storage for location sequence data of the protocol being viewed/edited by the user
     * @memberof state
     * @property {array} sequences - The sequences attribute of the object in the protocol cache
     * @property {number} sequenceCounter - A number used to assign unique IDs to newly created sequence objects
     */
    cache: {
      sequences: [],
      sequenceCounter: 0,
    },
  }),
  /**
   * Mutations for the Vuex state
   * @type {object}
   * @namespace mutations
   */
  mutations: {
    /**
     * Updates the value of the sequence attribute of the protocol object cache
     * @param {Object} state - (Vuex Arg) The state within the location sequence module
     * @param {Array.<Object>} data - The value to update the value of the sequences attribute of the protocol object cache
     * @memberof mutations
     */
    [types.UPDATE_CACHED_PROTOCOL_LOCATION_SEQUENCES](state, data) {
      state.cache.sequences = data;
    },
    /**
     * Resets the value of the sequence and sequence counter attribues of the protocol object cache to their default values
     * @param {Object} state - (Vuex Arg) The state within the location sequence module
     * @memberof mutations
     */
    [types.RESET_LOCATION_SEQUENCES](state) {
      state.cache.sequences = [];
      state.cache.sequenceCounter = 0;
    },
    /**
     * Updates the name of the location sequence in the protocol object cache in a way to prevent location sequence name conflicts
     * @param {Object} state - (Vuex Arg) The state within the location sequence module
     * @param {Object} data - Contains data required to update the name of the location sequence in the protocol object cache
     * @param {String} data.value - The new name of the sequence
     * @param {Number} data.seqIdx - The unique ID of the sequence
     * @memberof mutations
     */
    [types.UPDATE_SEQUENCE_NAME](state, data) {
      let name = data.value;
      if (state.cache.sequences.map((item) => item.name).includes(name))
        name = `${name} (1)`;
      state.cache.sequences.filter(
        (item) => item.id === data.seqIdx
      )[0].name = name;
    },
    /**
     * Updates the slot name of a location (selected by ID) in the protocol object cache
     * @param {Object} state - (Vuex Arg) The state within the location sequence module
     * @param {Object} data - Contains data required to update the slot name of the location sequence in the protocol object cache
     * @param {Number} data.seqIdx - The unique ID of the sequence
     * @param {Number} data.locIdx - The unique ID of the location within the sequence
     * @param {Object} data.value - Contains data on the newly assigned slot
     * @param {String} data.value.name - The name of the newly assigned slot
     * @param {Number} data.value.id - The unique ID of the newly assigned slot
     * @memberof mutations
     */
    [types.UPDATE_LOCATION_SLOT_NAME](state, data) {
      state.cache.sequences
        .filter((item) => item.id === data.seqIdx)[0]
        .locations.filter((item) => item.id === data.locIdx)[0].slot_number =
        data.value.id;
      state.cache.sequences
        .filter((item) => item.id === data.seqIdx)[0]
        .locations.filter((item) => item.id === data.locIdx)[0].slot_name =
        data.value.name;
    },
    /**
     * Updates the slot name of the location as a result of a change in its data dependency
     * @param {Object} state - (Vuex Arg) The state within the location sequence module
     * @param {Object} obj - Contains data required to update the slot name as a result of a change in its data dependency
     * @param {String} obj.signal - The kind of action to be performed as a result of the propagated change
     * @param {Number} obj.sink_hash - The unique ID of the sequence location to be updated
     * @param {Object} obj.value - Contains the source data for the propagated change
     * @param {String} obj.value.name - The name of the newly assigned slot
     * @param {String} obj.value.id - The unique ID of the newly assigned slot
     * @memberof mutations
     */
    [types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_LOCATION_SLOT_NAME](state, obj) {
      const seqIdx = parseInt(obj.sink_hash.split("-")[0]);
      const locIdx = parseInt(obj.sink_hash.split("-")[1]);
      if (obj.signal === "UPDATE") {
        state.cache.sequences
          .filter((item) => item.id === seqIdx)[0]
          .locations.filter((item) => item.id === locIdx)[0].slot_number =
          obj.value.id;
        state.cache.sequences
          .filter((item) => item.id === seqIdx)[0]
          .locations.filter((item) => item.id === locIdx)[0].slot_name =
          obj.value.name;
      } else if (obj.signal === "DELETE") {
        state.cache.sequences
          .filter((item) => item.id === seqIdx)[0]
          .locations.filter((item) => item.id === locIdx)[0].slot_number = -1;
        state.cache.sequences
          .filter((item) => item.id === seqIdx)[0]
          .locations.filter((item) => item.id === locIdx)[0].slot_name = "";
      }
    },
    /**
     * Updates the name of a sequence location (selected by ID) in the protocol object cache
     * @param {Object} state - (Vuex Arg) The state within the location sequence module
     * @param {Object} data - Contains data required to update the name of a sequence location in the protocol object cache
     * @param {Number} data.seqIdx - The unique ID of the sequence
     * @param {Number} data.locIdx - The unique ID of the location within the sequence
     * @param {Array.<string>} data.value - The new value of the location wells attribute
     * @memberof mutations
     */
    [types.UPDATE_LOCATION_WELLS](state, data) {
      state.cache.sequences
        .filter((item) => item.id === data.seqIdx)[0]
        .locations.filter((item) => item.id === data.locIdx)[0].wells =
        data.value;
    },
    /**
     * Updates the offset type of a sequence location (selected by ID) in the protocol object cache
     * @param {Object} state - (Vuex Arg) The state within the location sequence module
     * @param {Object} data - Contains data required to update the offset type of a sequence location in the protocol object cache
     * @param {Number} data.seqIdx - The unique ID of the sequence
     * @param {Number} data.locIdx - The unique ID of the location within the sequence
     * @param {String} data.value - The new value of the location offset type attribute
     * @memberof mutations
     */
    [types.UPDATE_LOCATION_OFFSET_TYPE](state, data) {
      state.cache.sequences
        .filter((item) => item.id === data.seqIdx)[0]
        .locations.filter(
          (item) => item.id === data.locIdx
        )[0].offset.offset_type = data.value;
    },
    /**
     * Updates the offset value of a sequence location (selected by ID) in the protocol object cache
     * @param {Object} state - (Vuex Arg) The state within the location sequence module
     * @param {Object} data - Contains data required to update the offset value of a sequence location in the protocol object cache
     * @param {Number} data.seqIdx - The unique ID of the sequence
     * @param {Number} data.locIdx - The unique ID of the location within the sequence
     * @param {String} data.value - The new value of the location offset value attribute
     * @memberof mutations
     */
    [types.UPDATE_LOCATION_OFFSET_VALUE](state, data) {
      state.cache.sequences
        .filter((item) => item.id === data.seqIdx)[0]
        .locations.filter((item) => item.id === data.locIdx)[0].offset.value =
        data.value;
    },
    /**
     * Creates a location sequence within the object in the protocol cache
     * @param {Object} state - (Vuex Arg) The state within the location sequence module
     * @memberof mutations
     */
    [types.CREATE_LOCATION_SEQUENCE](state) {
      state.cache.sequences.push(
        getNewSequence(
          `Sequence (${state.cache.sequenceCounter})`,
          state.cache.sequenceCounter++
        )
      );
    },
    /**
     * Creates and adds a new location to a parent sequence (selected by ID)
     * @param {Object} state - (Vuex Arg) The state within the location sequence module
     * @param {Number} idx - The index of the parent sequence to contain new location
     * @memberof mutations
     */
    [types.CREATE_LOCATION](state, idx) {
      state.cache.sequences
        .filter((item) => item.id === idx)[0]
        .locations.push(
          getNewSequenceLocation(
            state.cache.sequences.filter((item) => item.id === idx)[0]
              .locationCounter++
          )
        );
    },
    /**
     * Reset variables related to the location sequence UI view/form within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the location sequence module
     * @memberof mutations
     */
    [types.RESET_LOCATION_SEQUENCE_VARIABLES](state) {
      state.vars.locSeqID = "";
      state.vars.locSeqCategory = "";
    },
    /**
     * Updates the variables related to the location sequence UI view/form within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the location sequence module
     * @param {Object} data - Data used to update variables realted to the location sequence UI view/form within the protocol cache object
     * @memberof mutations
     */
    [types.UPDATE_LOCATION_SEQUENCE_VARIABLES](state, data) {
      state.vars = { ...state.vars, ...data };
    },
    /**
     * Deletes a location sequence (selected by ID) from the object within the protocol cache
     * @param {Object} state - (Vuex Arg) The state within the location sequence module
     * @param {Number} id - The unique ID of the location sequence to be deleted
     * @memberof mutations
     */
    [types.DELETE_LOCATION_SEQUENCE](state, id) {
      state.cache.sequences = state.cache.sequences.filter(
        (item) => item.id !== id
      );
    },
    /**
     * Updates the value of the sequence counter location sequence attribute within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the location sequence module
     * @param {Number} data - A new value for the sequence counter location sequence attribute within the protocol cache object
     * @memberof mutations
     */
    [types.UPDATE_CACHED_PROTOCOL_SEQUENCE_COUNTER](state, data) {
      state.cache.sequenceCounter = data;
    },
    /**
     * Deletes a location from a location sequence within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the location sequence module
     * @param {Object} data - Contains the unique ID of the location to be deleted and that of its parent location sequence
     * @param {Number} data.seqIdx - The unique ID of the sequence
     * @param {Number} data.locIdx - The unique ID of the location within the sequence
     * @memberof mutations
     */
    [types.DELETE_LOCATION](state, data) {
      state.cache.sequences.filter(
        (item) => item.id === data.seqIdx
      )[0].locations = state.cache.sequences
        .filter((item) => item.id === data.seqIdx)[0]
        .locations.filter((item) => item.id !== data.locIdx);
    },
  },
  /**
   * Actions for the Vuex state
   * @type {object}
   * @namespace actions
   */
  actions: {
    /**
     * Commits a mutation to create a location sequence within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @memberof actions
     */
    [types.CREATE_LOCATION_SEQUENCE]({ commit }) {
      return new Promise((resolve, reject) => {
        commit(types.CREATE_LOCATION_SEQUENCE);
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Loads the data dependency objects corresponding to a location (selected by ID) into the
     * dependencies attribute of the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} obj - Contains data related to the location in question
     * @param {Number} obj.seqIdx - The unique ID of the sequence
     * @param {Object} obj.location - Contains data about the location within the sequence
     * @param {Number} obj.location.id - The unique ID of the location within the sequence
     * @param {Number} obj.location.slot_number - The value of the slot number attribute of the location within the sequence
     * @memberof actions
     */
    [types.LOAD_LOCATION_DEPENDENCY_LINKS]({ commit }, obj) {
      return new Promise((resolve, reject) => {
        commit(
          types.ADD_CACHED_PROTOCOL_DEPENDENCY_LINK,
          {
            sink: "location",
            sink_hash: `${obj.seqIdx}-${obj.location.id}`,
            sink_ppty: "slot",
            source: "slot",
            source_hash: [obj.location.slot_number],
            atype: types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_LOCATION_SLOT_NAME,
          },
          { root: true }
        );
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Creates a new location within a location sequence (selected by ID) in the protocol cache object and loads the data
     * depedency objects corresponding tho this location into the dependencies attribute of the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Number} idx - The unique ID of the parent location sequence of the location to be created within the protocol cache object
     * @memberof actions
     */
    [types.CREATE_LOCATION]({ state, commit }, idx) {
      return new Promise((resolve, reject) => {
        commit(types.CREATE_LOCATION, idx);
        commit(
          types.ADD_CACHED_PROTOCOL_DEPENDENCY_LINK,
          {
            sink: "location",
            sink_hash: `${idx}-${state.cache.sequences.filter(
              (item) => item.id === idx
            )[0].locationCounter - 1}`,
            sink_ppty: "slot",
            source: "slot",
            source_hash: "",
            atype: types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_LOCATION_SLOT_NAME,
          },
          { root: true }
        );
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Updates the wells attribute of a location within a location sequence (selected by ID) and propagates this change
     * to other attributes of the protocol cache object that have it as a data dependency
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the wells attribute of a location within a location sequence
     * @param {Number} data.seqIdx - The unique ID of the sequence
     * @param {Number} data.locIdx - The unique ID of the location within the sequence
     * @param {Array.<String>} data.value - The new value of the location wells attribute
     * @memberof actions
     */
    [types.UPDATE_LOCATION_WELLS](
      { state, commit, rootGetters, dispatch },
      data
    ) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_LOCATION_WELLS, data);
        const depObjects = rootGetters.cachedProtocolDependencies.filter(
          (obj) =>
            obj.source === "sequence" && obj.source_hash.includes(data.seqIdx)
        );
        for (let obj of depObjects) {
          dispatch(obj.atype, {
            signal: "UPDATE",
            sink_hash: obj.sink_hash,
            sink_ppty: obj.sink_ppty,
            value: state.cache.sequences.filter(
              (item) => item.id === data.seqIdx
            )[0],
          });
        }
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Updates the "offset type" attribute of a location within a location sequence (selected by ID) and propagates this change
     * to other attributes of the protocol cache object that have it as a data dependency
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "offset type" attribute of a location within a location sequence
     * @param {Number} data.seqIdx - The unique ID of the sequence
     * @param {Number} data.locIdx - The unique ID of the location within the sequence
     * @param {String} data.value - The new value of the location offset type attribute
     * @memberof actions
     */
    [types.UPDATE_LOCATION_OFFSET_TYPE](
      { state, commit, rootGetters, dispatch },
      data
    ) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_LOCATION_OFFSET_TYPE, data);
        const depObjects = rootGetters.cachedProtocolDependencies.filter(
          (obj) =>
            obj.source === "sequence" && obj.source_hash.includes(data.seqIdx)
        );
        for (let obj of depObjects) {
          dispatch(obj.atype, {
            signal: "UPDATE",
            sink_hash: obj.sink_hash,
            sink_ppty: obj.sink_ppty,
            value: state.cache.sequences.filter(
              (item) => item.id === data.seqIdx
            )[0],
          });
        }
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Updates the "offset value" attribute of a location within a location sequence (selected by ID) and propagates this change
     * to other attributes of the protocol cache object that have it as a data dependency
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "offset value" attribute of a location within a location sequence
     * @param {Number} data.seqIdx - The unique ID of the sequence
     * @param {Number} data.locIdx - The unique ID of the location within the sequence
     * @param {Number} data.value - The new value of the location offset value attribute
     * @memberof actions
     */
    [types.UPDATE_LOCATION_OFFSET_VALUE](
      { state, commit, rootGetters, dispatch },
      data
    ) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_LOCATION_OFFSET_VALUE, data);
        const depObjects = rootGetters.cachedProtocolDependencies.filter(
          (obj) =>
            obj.source === "sequence" && obj.source_hash.includes(data.seqIdx)
        );
        for (let obj of depObjects) {
          dispatch(obj.atype, {
            signal: "UPDATE",
            sink_hash: obj.sink_hash,
            sink_ppty: obj.sink_ppty,
            value: state.cache.sequences.filter(
              (item) => item.id === data.seqIdx
            )[0],
          });
        }
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Updates the "slot name" attribute of a location within a location sequence (selected by ID) and propagates this change
     * to other attributes of the protocol cache object that have it as a data dependency
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "slot name" attribute of a location within a location sequence
     * @param {Number} data.seqIdx - The unique ID of the sequence
     * @param {Number} data.locIdx - The unique ID of the location within the sequence
     * @param {String} data.value - The new value of the location slot name attribute
     * @memberof actions
     */
    [types.UPDATE_LOCATION_SLOT_NAME](
      { state, commit, rootGetters, dispatch },
      data
    ) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_LOCATION_SLOT_NAME, data);
        const depObjects = rootGetters.cachedProtocolDependencies.filter(
          (obj) =>
            obj.source === "sequence" && obj.source_hash.includes(data.seqIdx)
        );
        for (let obj of depObjects) {
          dispatch(obj.atype, {
            signal: "UPDATE",
            sink_hash: obj.sink_hash,
            sink_ppty: obj.sink_ppty,
            value: state.cache.sequences.filter(
              (item) => item.id === data.seqIdx
            )[0],
          });
        }
        rootGetters.cachedProtocolDependencies.filter(
          (obj) =>
            obj.sink === "location" &&
            obj.sink_hash === `${data.seqIdx}-${data.locIdx}` &&
            obj.sink_ppty === "slot"
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
     * Updates the name of a location sequence (selected by ID) and propagates this change
     * to other attributes of the protocol cache object that have it as a data dependency
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the name of a location sequence within the protocol cache object
     * @param {Number} data.seqIdx - The unique ID of the sequence
     * @param {String} data.value - The new value of the name attribute of the sequence
     * @memberof actions
     */
    [types.UPDATE_SEQUENCE_NAME](
      { state, commit, rootGetters, dispatch },
      data
    ) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_SEQUENCE_NAME, data);
        const depObjects = rootGetters.cachedProtocolDependencies.filter(
          (obj) =>
            obj.source === "sequence" && obj.source_hash.includes(data.seqIdx)
        );
        for (let obj of depObjects) {
          dispatch(obj.atype, {
            signal: "UPDATE",
            sink_hash: obj.sink_hash,
            sink_ppty: obj.sink_ppty,
            value: state.cache.sequences.filter(
              (item) => item.id === data.seqIdx
            )[0],
          });
        }
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Deletes a location sequence (selected by ID) and propagates this change
     * to other attributes of the protocol cache object that have it as a data dependency
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Number} id - The unique ID of the location sequence to be deleted
     * @memberof actions
     */
    [types.DELETE_LOCATION_SEQUENCE](
      { state, rootGetters, dispatch, commit },
      id
    ) {
      return new Promise((resolve, reject) => {
        commit(types.RESET_LOCATION_SEQUENCE_VARIABLES);
        const depObjects = rootGetters.cachedProtocolDependencies.filter(
          (obj) => obj.source === "sequence" && obj.source_hash.includes(id)
        );
        for (let obj of depObjects) {
          dispatch(obj.atype, {
            signal: "DELETE",
            sink_hash: obj.sink_hash,
            sink_ppty: obj.sink_ppty,
            value: state.cache.sequences.filter((item) => item.id === id)[0],
          });
          obj.source_hash = "";
        }

        commit(
          types.UPDATE_CACHED_PROTOCOL_DEPENDENCY_LINKS,
          rootGetters.cachedProtocolDependencies.filter(
            (obj) =>
              !(obj.source === "sequence" && obj.source_hash.includes(id))
          ),
          { root: true }
        );
        commit(types.DELETE_LOCATION_SEQUENCE, id);
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Deletes a location (selected by ID) of a location sequence and propagates this change
     * to other attributes of the protocol cache object that have it as a data dependency
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to delete a location of  location sequence within the protocol cache object
     * @param {Number} data.seqIdx - The unique ID of the sequence
     * @param {Number} data.locIdx - The unique ID of the location within the sequence
     * @memberof actions
     */
    [types.DELETE_LOCATION]({ state, commit, rootGetters, dispatch }, data) {
      return new Promise((resolve, reject) => {
        commit(types.RESET_LOCATION_SEQUENCE_VARIABLES);
        commit(types.DELETE_LOCATION, data);
        const depObjects = rootGetters.cachedProtocolDependencies.filter(
          (obj) =>
            obj.source === "sequence" && obj.source_hash.includes(data.seqIdx)
        );
        for (let obj of depObjects) {
          dispatch(obj.atype, {
            signal: "UPDATE",
            sink_hash: obj.sink_hash,
            sink_ppty: obj.sink_ppty,
            value: state.cache.sequences.filter(
              (item) => item.id === data.seqIdx
            )[0],
          });
        }
        commit(
          types.UPDATE_CACHED_PROTOCOL_DEPENDENCY_LINKS,
          rootGetters.cachedProtocolDependencies.filter(
            (obj) =>
              !(
                obj.sink === "location" &&
                obj.sink_hash ===
                  `${
                    state.cache.sequences.filter(
                      (item) => item.id === data.seqIdx
                    )[0].id
                  }-${
                    state.cache.sequences
                      .filter((item) => item.id === data.seqIdx)[0]
                      .locations.filter((item) => item.id === data.locIdx)[0]
                  }`
              )
          ),
          { root: true }
        );
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Updates variables that store data about the location sequence UI form/view
     * @param {context} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update location sequence variables in the protocol cache object
     * @memberof actions
     */
    [types.UPDATE_LOCATION_SEQUENCE_VARIABLES]({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_LOCATION_SEQUENCE_VARIABLES, data);
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Updates the value of the location sequence counter within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Number} data - The new value for the location sequence counter of the protocol cache object
     * @memberof actions
     */
    [types.UPDATE_CACHED_PROTOCOL_SEQUENCE_COUNTER]({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_CACHED_PROTOCOL_SEQUENCE_COUNTER, data);
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Uses propagated changes from source data dependencies to update the location slot name of a location sequence
     * in the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} obj - Contains propagated data from a source data dependency to update the location slot name attribute
     * @param {String} obj.signal - The kind of action to be performed as a result of the propagated change
     * @param {Number} obj.sink_hash - The unique ID of the sequence location to be updated
     * @param {Object} obj.value - Contains the source data for the propagated change
     * @param {String} obj.value.name - The name of the newly assigned slot
     * @param {String} obj.value.id - The unique ID of the newly assigned slot
     * @memberof actions
     */
    [types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_LOCATION_SLOT_NAME]({ commit }, obj) {
      return new Promise((resolve, reject) => {
        commit(types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_LOCATION_SLOT_NAME, obj);
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Duplicates a location within a location sequence in the protocol cache object and duplicates it data
     * dependencies with other attributes of the protocol cache objects as well
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to duplication a location within a location sequence
     * @param {Number} data.seqIdx - The unique ID of the sequence
     * @param {Number} data.locIdx - The unique ID of the location within the sequence
     * @memberof actions
     */
    [types.DUPLICATE_LOCATION]({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        const selectedSequence = state.cache.sequences.filter(
          (item) => item.id === data.seqIdx
        )[0];
        const clonedLocation = JSON.parse(
          JSON.stringify(
            selectedSequence.locations.filter((item) => item.id === data.locIdx)[0]
          )
        );
        commit(
          types.DUPLICATE_CACHED_PROTOCOL_DEPENDENCY_LINK,
          {
            oldIdx: `${data.seqIdx}-${data.locIdx}`,
            newIdx: `${data.seqIdx}-${selectedSequence.locationCounter}`,
            sink: "location",
          },
          { root: true }
        );
        clonedLocation.id = selectedSequence.locationCounter++;
        selectedSequence.locations.push(clonedLocation);
        commit(
          types.UPDATE_CACHED_PROTOCOL_LOCATION_SEQUENCES,
          state.cache.sequences
        );
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Duplicates  a location sequence in the protocol cache object and duplicates it data
     * dependencies with other attributes of the protocol cache objects as well
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Number} id - The unique ID of the location sequence to be duplicated in the protocol cache object
     * @memberof actions
     */
    [types.DUPLICATE_LOCATION_SEQUENCE]({ state, commit }, id) {
      return new Promise((resolve, reject) => {
        const clonedSequence = JSON.parse(
          JSON.stringify(
            state.cache.sequences.filter((item) => item.id === id)[0]
          )
        );
        for (let loc of clonedSequence.locations) {
          commit(
            types.DUPLICATE_CACHED_PROTOCOL_DEPENDENCY_LINK,
            {
              oldIdx: `${id}-${loc.id}`,
              newIdx: `${state.cache.sequenceCounter}-${loc.id}`,
              sink: "location",
            },
            { root: true }
          );
        }
        clonedSequence.id = state.cache.sequenceCounter++;
        clonedSequence.name = clonedSequence.name + " - cloned*";
        state.cache.sequences.push(clonedSequence);
        commit(
          types.UPDATE_CACHED_PROTOCOL_LOCATION_SEQUENCES,
          state.cache.sequences
        );
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
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
     * Fetches an array of all location sequence defined in the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the location sequence module
     * @returns {array} - An array of all location sequences defined in the protocol cache object
     * @memberof getters
     */
    cachedProtocolSequences: (state) => state.cache.sequences,
    /**
     * Fetches a number that can be assigned as a unique ID for a newly created location sequence
     * @param {Object} state - (Vuex Arg) The state within the location sequence module
     * @returns {number} - A number that can be assigned as a unique ID for a newly created location sequence
     * @memberof getters
     */
    cachedProtocolSequenceCounter: (state) => state.cache.sequenceCounter,
  },
};
