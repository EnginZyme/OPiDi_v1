import types from "../../../types";
import { getNewLiquidClass } from "../../defaultData/liquidClassesData";

export default {
  /**
   * @returns {object} - The Vuex state
   * @namespace state
   */
  state: () => ({
    /**
     * Stores data related to liquid-classes-related views and form UIs
     * @type {object}
     * @memberof state
     * @property {number} chosenLiquidClassID - Stores the index of the chosen liquid class card in the UI
     */
    vars: {
      chosenLiquidClassID: -1
    },
    /**
     * Serves as a cache storage for liquid classes data of the protocol being viewed/edited by user
     * @type {object}
     * @memberof state
     * @property {number} liquid_classes - The liquid class attribute of the the object in the protocol cache
     * @property {number} liquidClassCounter - A number used to assign unique IDs to created liquid class objects
     */
    cache: {
      liquid_classes: [],
      liquidClassCounter: 1,
    },
  }),
  /**
   * Mutations for the Vuex state
   * @type {object}
   * @namespace mutations
   */
  mutations: {
    /**
     * Updates the value of the liquid classes attribute of the object within the protocol cache
     * @param {Object} state - (Vuex Arg) The state within the liquid class module
     * @param {Object} data - An object to update the value of the liquid classes attribute of the object within the protocol cache
     * @memberof mutations
     */
    [types.UPDATE_CACHED_PROTOCOL_LIQUID_CLASSES](state, data) {
      state.cache.liquid_classes = data;
    },
    /**
     * Resets the value of the liquid classes attribute of the object within the protocol cache
     * @param {Object} state - (Vuex Arg) The state within the liquid class module
     * @memberof mutations
     */
    [types.RESET_LIQUID_CLASSES](state) {
      state.cache.liquid_classes = [];
      state.cache.liquidClassCounter = 1;
    },
    /**
     * Updates the name attribute of a liquid class (selected by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the liquid class module
     * @param {Object} data - Contains data required to update the name attribute of a liquid class within the protocol cache object
     * @param {Number} data.lcIdx - The unique ID of the liquid class
     * @param {String} data.value - The new value to be assigned to the name attribute of the liquid class
     * @memberof mutations
     */
    [types.UPDATE_LIQUID_CLASS_NAME](state, data) {
      state.cache.liquid_classes.filter(
        (item) => item.id === data.lcIdx
      )[0].name = data.value;
    },
    /**
     * Updates the "touch tip" attribute of a liquid class (selected by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the liquid class module
     * @param {Object} data - Contains data required to update the "touch tip" attribute of a liquid class within the protocol cache object
     * @param {Number} data.lcIdx - The unique ID of the liquid class
     * @param {Boolean} data.value - The value to be assigned to the "touch tip" attribute of the liquid class
     * @memberof mutations
     */
    [types.UPDATE_LIQUID_CLASS_TOUCH_TIP](state, data) {
      state.cache.liquid_classes.filter(
        (item) => item.id === data.lcIdx
      )[0].liquid_config_object.touch_tip = data.value;
    },
    /**
     * Updates the "blow out" attribute of a liquid class (selected by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the liquid class module
     * @param {Object} data - Contains data required to update the "blow out" attribute of a liquid class within the protocol cache object
     * @param {Number} data.lcIdx - The unique ID of the liquid class
     * @param {Boolean} data.value - The value to be assigned to the "blow out" attribute of the liquid class
     * @memberof mutations
     */
    [types.UPDATE_LIQUID_CLASS_BLOW_OUT](state, data) {
      state.cache.liquid_classes.filter(
        (item) => item.id === data.lcIdx
      )[0].liquid_config_object.blow_out = data.value;
    },
    /**
     * Updates the "carry over" attribute of a liquid class (selected by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the liquid class module
     * @param {Object} data - Contains data required to update the "carry over" attribute of a liquid class within the protocol cache object
     * @param {Number} data.lcIdx - The unique ID of the liquid class
     * @param {Boolean} data.value - The value to be assigned to the "carry over" attribute of the liquid class
     * @memberof mutations
     */
    [types.UPDATE_LIQUID_CLASS_CARRY_OVER](state, data) {
      state.cache.liquid_classes.filter(
        (item) => item.id === data.lcIdx
      )[0].liquid_config_object.carryover = data.value;
    },
    /**
     * Updates the "air gap" attribute of a liquid class (selected by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the liquid class module
     * @param {Object} data - Contains data required to update the "air gap" attribute of a liquid class within the protocol cache object
     * @param {Number} data.lcIdx - The unique ID of the liquid class
     * @param {String} data.value - The value to be assigned to the "air gap" attribute of the liquid class
     * @memberof mutations
     */
    [types.UPDATE_LIQUID_CLASS_AIR_GAP](state, data) {
      state.cache.liquid_classes.filter(
        (item) => item.id === data.lcIdx
      )[0].liquid_config_object.air_gap = data.value;
    },
    /**
     * Updates the "blow out location" attribute of a liquid class (selected by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the liquid class module
     * @param {Object} data - Contains data required to update the "blow out location" attribute of a liquid class within the protocol cache object
     * @param {Number} data.lcIdx - The unique ID of the liquid class
     * @param {String} data.value - The value to be assigned to the "blow out location" attribute of the liquid class
     * @memberof mutations
     */
    [types.UPDATE_LIQUID_CLASS_BLOWOUT_LOCATION](state, data) {
      state.cache.liquid_classes.filter(
        (item) => item.id === data.lcIdx
      )[0].liquid_config_object.blowout_location = data.value;
    },
    /**
     * Updates the "mix before volume" attribute of a liquid class (selected by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the liquid class module
     * @param {Object} data - Contains data required to update the "mix before volume" attribute of a liquid class within the protocol cache object
     * @param {Number} data.lcIdx - The unique ID of the liquid class
     * @param {String} data.value - The value to be assigned to the blow out attribute of the liquid class
     * @memberof mutations
     */
    [types.UPDATE_LIQUID_CLASS_MIX_BEFORE_VOLUME](state, data) {
      state.cache.liquid_classes.filter(
        (item) => item.id === data.lcIdx
      )[0].liquid_config_object.mix_before.volume = data.value;
    },
    /**
     * Updates the "mix before reps" attribute of a liquid class (selected by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the liquid class module
     * @param {Object} data - Contains data required to update the "mix before reps" attribute of a liquid class within the protocol cache object
     * @param {Number} data.lcIdx - The unique ID of the liquid class
     * @param {String} data.value - The value to be assigned to the "mix before reps" attribute of the liquid class
     * @memberof mutations
     */
    [types.UPDATE_LIQUID_CLASS_MIX_BEFORE_REPS](state, data) {
      state.cache.liquid_classes.filter(
        (item) => item.id === data.lcIdx
      )[0].liquid_config_object.mix_before.repetitions = data.value;
    },
    /**
     * Updates the "mix after volume" attribute of a liquid class mix after volume (selected by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the liquid class module
     * @param {Object} data - Contains data required to update the "mix after volume" attribute of a liquid class  within the protocol cache object
     * @param {Number} data.lcIdx - The unique ID of the liquid class
     * @param {String} data.value - The value to be assigned to the "mix after volume" attribute of the liquid class
     * @memberof mutations
     */
    [types.UPDATE_LIQUID_CLASS_MIX_AFTER_VOLUME](state, data) {
      state.cache.liquid_classes.filter(
        (item) => item.id === data.lcIdx
      )[0].liquid_config_object.mix_after.volume = data.value;
    },
    /**
     * Updates the "mix after reps" attribute of a liquid class (selected by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the liquid class module
     * @param {Object} data - Contains data required to update the "mix after reps" attribute of a liquid class within the protocol cache object
     * @param {Number} data.lcIdx - The unique ID of the liquid class
     * @param {String} data.value - The value to be assigned to the "mix after reps" attribute of the liquid class
     * @memberof mutations
     */
    [types.UPDATE_LIQUID_CLASS_MIX_AFTER_REPS](state, data) {
      state.cache.liquid_classes.filter(
        (item) => item.id === data.lcIdx
      )[0].liquid_config_object.mix_after.repetitions = data.value;
    },
    /**
     * Updates the "mix after volume" attribute of a liquid class aspirate rate (selected by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the liquid class module
     * @param {Object} data - Contains data required to update the "aspirate rate" attribute of a liquid class  within the protocol cache object
     * @param {Number} data.lcIdx - The unique ID of the liquid class
     * @param {String} data.value - The value to be assigned to the "aspirate rate" attribute of the liquid class
     * @memberof mutations
     */
    [types.UPDATE_LIQUID_CLASS_ASPIRATE_RATE](state, data) {
      state.cache.liquid_classes.filter(
        (item) => item.id === data.lcIdx
      )[0].liquid_config_object.aspirate_rate = data.value;
    },
    /**
     * Updates the "mix after volume" attribute of a liquid class dispense rate (selected by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the liquid class module
     * @param {Object} data - Contains data required to update the "dispense rate" attribute of a liquid class  within the protocol cache object
     * @param {Number} data.lcIdx - The unique ID of the liquid class
     * @param {String} data.value - The value to be assigned to the "dispense rate" attribute of the liquid class
     * @memberof mutations
     */
    [types.UPDATE_LIQUID_CLASS_DISPENSE_RATE](state, data) {
      state.cache.liquid_classes.filter(
        (item) => item.id === data.lcIdx
      )[0].liquid_config_object.dispense_rate = data.value;
    },
    /**
     * Updates the "mix after volume" attribute of a liquid class blow-out rate (selected by ID) within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the liquid class module
     * @param {Object} data - Contains data required to update the "blow-out rate" attribute of a liquid class  within the protocol cache object
     * @param {Number} data.lcIdx - The unique ID of the liquid class
     * @param {String} data.value - The value to be assigned to the "blow-out rate" attribute of the liquid class
     * @memberof mutations
     */
    [types.UPDATE_LIQUID_CLASS_BLOW_OUT_RATE](state, data) {
      state.cache.liquid_classes.filter(
        (item) => item.id === data.lcIdx
      )[0].liquid_config_object.blow_out_rate = data.value;
    },
    /**
     * Creates a new liquid class within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the liquid class module
     * @memberof mutations
     */
    [types.CREATE_LIQUID_CLASS](state) {
      state.cache.liquid_classes.push(
        getNewLiquidClass(
          `Liquid Class (${state.cache.liquidClassCounter})`,
          state.cache.liquidClassCounter++
        )
      );
    },
    /**
     * Resets the value of the liquid class UI variables within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the liquid class module
     * @memberof mutations
     */
    [types.RESET_LIQUID_CLASS_VARIABLES](state) {
      state.vars.chosenLiquidClassID = -1;
    },
    /**
     * Updates the liquid class UI variables within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the liquid class module
     * @param {Object} data - Contains updates to the liquid class UI variables within the protocol cache object
     * @memberof mutations
     */
    [types.UPDATE_LIQUID_CLASS_VARIABLES](state, data) {
      state.vars = { ...state.vars, ...data };
    },
    /**
     * Deletes a liquid class (specified by its ID) from the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the liquid class module
     * @param {Number} id - The unique ID of the liquid class to be deleted from the protocol cache object
     * @memberof mutations
     */
    [types.DELETE_LIQUID_CLASS](state, id) {
      state.cache.liquid_classes = state.cache.liquid_classes.filter(
        (item) => item.id !== id
      );
    },
    /**
     * Updates the liquid class counter within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the liquid class module
     * @param {Number} data - The value used to update the liquid class counter within the protocol cache object
     */
    [types.UPDATE_CACHED_PROTOCOL_LIQUID_CLASS_COUNTER](state, data) {
      state.cache.liquidClassCounter = data;
    },
  },
  /**
   * Actions for the Vuex state
   * @type {object}
   * @namespace actions
   */
  actions: {
    /**
     * Commits a mutation to create a liquid class within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @memberof actions
     */
    [types.CREATE_LIQUID_CLASS]({ commit }) {
      return new Promise((resolve, reject) => {
        commit(types.CREATE_LIQUID_CLASS);
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits a mutation to update the name of a liquid class within the protocol cache and propagate the change to
     * all protocol cache object attributes that have it as a data dependency
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the name of a liquid class within the protocol cache object
     * @param {Number} data.lcIdx - The unique ID of the liquid class
     * @param {String} data.value - The new value to be assigned to the name attribute of the liquid class
     * @memberof actions
     */
    [types.UPDATE_LIQUID_CLASS_NAME](
      { state, commit, rootGetters, dispatch },
      data
    ) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_LIQUID_CLASS_NAME, data);
        const depObjects = rootGetters.cachedProtocolDependencies.filter(
          (obj) =>
            obj.source === "liquidClass" && obj.source_hash.includes(data.lcIdx)
        );
        for (let obj of depObjects) {
          dispatch(obj.atype, {
            signal: "UPDATE",
            sink_hash: obj.sink_hash,
            sink_ppty: obj.sink_ppty,
            value: state.cache.liquid_classes.filter(
              (item) => item.id === data.lcIdx
            )[0],
          });
        }
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits a mutation to update the "touch tip" value of a liquid class within the protocol cache and propagate the change to
     * all protocol cache object attributes that have it as a data dependency
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "touch tip" value of a liquid class within the protocol cache object
     * @param {Number} data.lcIdx - The unique ID of the liquid class
     * @param {String} data.value - The value to be assigned to the "touch tip" attribute of the liquid class
     * @memberof actions
     */
    [types.UPDATE_LIQUID_CLASS_TOUCH_TIP](
      { state, commit, rootGetters, dispatch },
      data
    ) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_LIQUID_CLASS_TOUCH_TIP, data);
        const depObjects = rootGetters.cachedProtocolDependencies.filter(
          (obj) =>
            obj.source === "liquidClass" && obj.source_hash.includes(data.lcIdx)
        );
        for (let obj of depObjects) {
          dispatch(obj.atype, {
            signal: "UPDATE",
            sink_hash: obj.sink_hash,
            sink_ppty: obj.sink_ppty,
            value: state.cache.liquid_classes.filter(
              (item) => item.id === data.lcIdx
            )[0],
          });
        }
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits a mutation to update the blow out value of a liquid class within the protocol cache and propagate the change to
     * all protocol cache object attributes that have it as a data dependency
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the blow out value of a liquid class within the protocol cache object
     * @param {Number} data.lcIdx - The unique ID of the liquid class
     * @param {String} data.value - The value to be assigned to the "blow out" attribute of the liquid class
     * @memberof actions
     */
    [types.UPDATE_LIQUID_CLASS_BLOW_OUT](
      { state, commit, rootGetters, dispatch },
      data
    ) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_LIQUID_CLASS_BLOW_OUT, data);
        const depObjects = rootGetters.cachedProtocolDependencies.filter(
          (obj) =>
            obj.source === "liquidClass" && obj.source_hash.includes(data.lcIdx)
        );
        for (let obj of depObjects) {
          dispatch(obj.atype, {
            signal: "UPDATE",
            sink_hash: obj.sink_hash,
            sink_ppty: obj.sink_ppty,
            value: state.cache.liquid_classes.filter(
              (item) => item.id === data.lcIdx
            )[0],
          });
        }
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits a mutation to update the "carry over" value of a liquid class within the protocol cache and propagate the change to
     * all protocol cache object attributes that have it as a data dependency
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "carry over" value of a liquid class within the protocol cache object
     * @param {Number} data.lcIdx - The unique ID of the liquid class
     * @param {String} data.value - The value to be assigned to the "carry over" attribute of the liquid class
     * @memberof actions
     */
    [types.UPDATE_LIQUID_CLASS_CARRY_OVER](
      { state, commit, rootGetters, dispatch },
      data
    ) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_LIQUID_CLASS_CARRY_OVER, data);
        const depObjects = rootGetters.cachedProtocolDependencies.filter(
          (obj) =>
            obj.source === "liquidClass" && obj.source_hash.includes(data.lcIdx)
        );
        for (let obj of depObjects) {
          dispatch(obj.atype, {
            signal: "UPDATE",
            sink_hash: obj.sink_hash,
            sink_ppty: obj.sink_ppty,
            value: state.cache.liquid_classes.filter(
              (item) => item.id === data.lcIdx
            )[0],
          });
        }
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits a mutation to update the "air gap" value of a liquid class within the protocol cache and propagate the change to
     * all protocol cache object attributes that have it as a data dependency
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "air gap" value of a liquid class within the protocol cache object
     * @param {Number} data.lcIdx - The unique ID of the liquid class
     * @param {String} data.value - The value to be assigned to the "air gap" attribute of the liquid class
     * @memberof actions
     */
    [types.UPDATE_LIQUID_CLASS_AIR_GAP](
      { state, commit, rootGetters, dispatch },
      data
    ) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_LIQUID_CLASS_AIR_GAP, data);
        const depObjects = rootGetters.cachedProtocolDependencies.filter(
          (obj) =>
            obj.source === "liquidClass" && obj.source_hash.includes(data.lcIdx)
        );
        for (let obj of depObjects) {
          dispatch(obj.atype, {
            signal: "UPDATE",
            sink_hash: obj.sink_hash,
            sink_ppty: obj.sink_ppty,
            value: state.cache.liquid_classes.filter(
              (item) => item.id === data.lcIdx
            )[0],
          });
        }
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits a mutation to update the "blow out location" value of a liquid class within the protocol cache and propagate the change to
     * all protocol cache object attributes that have it as a data dependency
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "blow out location" value of a liquid class within the protocol cache object
     * @param {Number} data.lcIdx - The unique ID of the liquid class
     * @param {String} data.value - The value to be assigned to the "blow out location" attribute of the liquid class
     * @memberof actions
     */
    [types.UPDATE_LIQUID_CLASS_BLOWOUT_LOCATION](
      { state, commit, rootGetters, dispatch },
      data
    ) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_LIQUID_CLASS_BLOWOUT_LOCATION, data);
        const depObjects = rootGetters.cachedProtocolDependencies.filter(
          (obj) =>
            obj.source === "liquidClass" && obj.source_hash.includes(data.lcIdx)
        );
        for (let obj of depObjects) {
          dispatch(obj.atype, {
            signal: "UPDATE",
            sink_hash: obj.sink_hash,
            sink_ppty: obj.sink_ppty,
            value: state.cache.liquid_classes.filter(
              (item) => item.id === data.lcIdx
            )[0],
          });
        }
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits a mutation to update the "mix before reps" value of a liquid class within the protocol cache and propagate the change to
     * all protocol cache object attributes that have it as a data dependency
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "mix before reps" value of a liquid class within the protocol cache object
     * @param {Number} data.lcIdx - The unique ID of the liquid class
     * @param {String} data.value - The value to be assigned to the "mix before reps" attribute of the liquid class
     * @memberof actions
     */
    [types.UPDATE_LIQUID_CLASS_MIX_BEFORE_REPS](
      { state, commit, rootGetters, dispatch },
      data
    ) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_LIQUID_CLASS_MIX_BEFORE_REPS, data);
        const depObjects = rootGetters.cachedProtocolDependencies.filter(
          (obj) =>
            obj.source === "liquidClass" && obj.source_hash.includes(data.lcIdx)
        );
        for (let obj of depObjects) {
          dispatch(obj.atype, {
            signal: "UPDATE",
            sink_hash: obj.sink_hash,
            sink_ppty: obj.sink_ppty,
            value: state.cache.liquid_classes.filter(
              (item) => item.id === data.lcIdx
            )[0],
          });
        }
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits a mutation to update the "mix before volume" value of a liquid class within the protocol cache and propagate the change to
     * all protocol cache object attributes that have it as a data dependency
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "mix before volume" value of a liquid class within the protocol cache object
     * @param {Number} data.lcIdx - The unique ID of the liquid class
     * @param {String} data.value - The value to be assigned to the blow out attribute of the liquid class
     * @memberof actions
     */
    [types.UPDATE_LIQUID_CLASS_MIX_BEFORE_VOLUME](
      { state, commit, rootGetters, dispatch },
      data
    ) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_LIQUID_CLASS_MIX_BEFORE_VOLUME, data);
        const depObjects = rootGetters.cachedProtocolDependencies.filter(
          (obj) =>
            obj.source === "liquidClass" && obj.source_hash.includes(data.lcIdx)
        );
        for (let obj of depObjects) {
          dispatch(obj.atype, {
            signal: "UPDATE",
            sink_hash: obj.sink_hash,
            sink_ppty: obj.sink_ppty,
            value: state.cache.liquid_classes.filter(
              (item) => item.id === data.lcIdx
            )[0],
          });
        }
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits an mutation to update the "mix after reps" value of a liquid class within the protocol cache and propagate the change to
     * all protocol cache object attributes that have it as a data dependency
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "mix after reps" value of a liquid class within the protocol cache object
     * @param {Number} data.lcIdx - The unique ID of the liquid class
     * @param {String} data.value - The value to be assigned to the "mix after reps" attribute of the liquid class
     * @memberof actions
     */
    [types.UPDATE_LIQUID_CLASS_MIX_AFTER_REPS](
      { state, commit, rootGetters, dispatch },
      data
    ) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_LIQUID_CLASS_MIX_AFTER_REPS, data);
        const depObjects = rootGetters.cachedProtocolDependencies.filter(
          (obj) =>
            obj.source === "liquidClass" && obj.source_hash.includes(data.lcIdx)
        );
        for (let obj of depObjects) {
          dispatch(obj.atype, {
            signal: "UPDATE",
            sink_hash: obj.sink_hash,
            sink_ppty: obj.sink_ppty,
            value: state.cache.liquid_classes.filter(
              (item) => item.id === data.lcIdx
            )[0],
          });
        }
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits an mutation to update the "mix after volume" value of a liquid class within the protocol cache and propagate the change to
     * all protocol cache object attributes that have it as a data dependency
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "mix after volume" value of a liquid class within the protocol cache object
     * @param {Number} data.lcIdx - The unique ID of the liquid class
     * @param {String} data.value - The value to be assigned to the "mix after volume" attribute of the liquid class
     * @memberof actions
     */
    [types.UPDATE_LIQUID_CLASS_MIX_AFTER_VOLUME](
      { state, commit, rootGetters, dispatch },
      data
    ) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_LIQUID_CLASS_MIX_AFTER_VOLUME, data);
        const depObjects = rootGetters.cachedProtocolDependencies.filter(
          (obj) =>
            obj.source === "liquidClass" && obj.source_hash.includes(data.lcIdx)
        );
        for (let obj of depObjects) {
          dispatch(obj.atype, {
            signal: "UPDATE",
            sink_hash: obj.sink_hash,
            sink_ppty: obj.sink_ppty,
            value: state.cache.liquid_classes.filter(
              (item) => item.id === data.lcIdx
            )[0],
          });
        }
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits an mutation to update the "aspirate rate" value of a liquid class within the protocol cache and propagate the change to
     * all protocol cache object attributes that have it as a data dependency
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "aspirate rate" value of a liquid class within the protocol cache object
     * @param {Number} data.lcIdx - The unique ID of the liquid class
     * @param {String} data.value - The value to be assigned to the "aspirate rate" attribute of the liquid class
     * @memberof actions
     */
    [types.UPDATE_LIQUID_CLASS_ASPIRATE_RATE](
      { state, commit, rootGetters, dispatch },
      data
    ) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_LIQUID_CLASS_ASPIRATE_RATE, data);
        const depObjects = rootGetters.cachedProtocolDependencies.filter(
          (obj) =>
            obj.source === "liquidClass" && obj.source_hash.includes(data.lcIdx)
        );
        for (let obj of depObjects) {
          dispatch(obj.atype, {
            signal: "UPDATE",
            sink_hash: obj.sink_hash,
            sink_ppty: obj.sink_ppty,
            value: state.cache.liquid_classes.filter(
              (item) => item.id === data.lcIdx
            )[0],
          });
        }
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits an mutation to update the "dispense rate" value of a liquid class within the protocol cache and propagate the change to
     * all protocol cache object attributes that have it as a data dependency
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "dispense rate" value of a liquid class within the protocol cache object
     * @param {Number} data.lcIdx - The unique ID of the liquid class
     * @param {String} data.value - The value to be assigned to the "dispense rate" attribute of the liquid class
     * @memberof actions
     */
    [types.UPDATE_LIQUID_CLASS_DISPENSE_RATE](
      { state, commit, rootGetters, dispatch },
      data
    ) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_LIQUID_CLASS_DISPENSE_RATE, data);
        const depObjects = rootGetters.cachedProtocolDependencies.filter(
          (obj) =>
            obj.source === "liquidClass" && obj.source_hash.includes(data.lcIdx)
        );
        for (let obj of depObjects) {
          dispatch(obj.atype, {
            signal: "UPDATE",
            sink_hash: obj.sink_hash,
            sink_ppty: obj.sink_ppty,
            value: state.cache.liquid_classes.filter(
              (item) => item.id === data.lcIdx
            )[0],
          });
        }
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits an mutation to update the "blow-out rate" value of a liquid class within the protocol cache and propagate the change to
     * all protocol cache object attributes that have it as a data dependency
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the "blow-out rate" value of a liquid class within the protocol cache object
     * @param {Number} data.lcIdx - The unique ID of the liquid class
     * @param {String} data.value - The value to be assigned to the "blow-out rate" attribute of the liquid class
     * @memberof actions
     */
    [types.UPDATE_LIQUID_CLASS_BLOW_OUT_RATE](
      { state, commit, rootGetters, dispatch },
      data
    ) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_LIQUID_CLASS_BLOW_OUT_RATE, data);
        const depObjects = rootGetters.cachedProtocolDependencies.filter(
          (obj) =>
            obj.source === "liquidClass" && obj.source_hash.includes(data.lcIdx)
        );
        for (let obj of depObjects) {
          dispatch(obj.atype, {
            signal: "UPDATE",
            sink_hash: obj.sink_hash,
            sink_ppty: obj.sink_ppty,
            value: state.cache.liquid_classes.filter(
              (item) => item.id === data.lcIdx
            )[0],
          });
        }
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits a mutation to delete a liquid class (selected by its ID) from the protocol cache object
     * Also, it propagates this change to attributes of the protocol cache object that have it as a data dependency
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Number} id - The unique ID of the liquid class to be deleted from the protocol cache object
     * @memberof actions
     */
    [types.DELETE_LIQUID_CLASS]({ state, commit, rootGetters, dispatch }, id) {
      return new Promise((resolve, reject) => {
        commit(types.RESET_LIQUID_CLASS_VARIABLES);
        const depObjects = rootGetters.cachedProtocolDependencies.filter(
          (obj) => obj.source === "liquidClass" && obj.source_hash.includes(id)
        );
        for (let obj of depObjects) {
          dispatch(obj.atype, {
            signal: "DELETE",
            sink_hash: obj.sink_hash,
            sink_ppty: obj.sink_ppty,
            value: state.cache.liquid_classes.filter(
              (item) => item.id === id
            )[0],
          });
          obj.source_hash = "";
        }

        commit(
          types.UPDATE_CACHED_PROTOCOL_DEPENDENCY_LINKS,
          rootGetters.cachedProtocolDependencies,
          { root: true }
        );
        commit(types.DELETE_LIQUID_CLASS, id);
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits a mutation that updates the liquid class UI variables within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Contains data required to update the liquid class UI variables within the protocol cache object
     * @memberof actions
     */
    [types.UPDATE_LIQUID_CLASS_VARIABLES]({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_LIQUID_CLASS_VARIABLES, data);
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits a mutation to update the liquid class counter within the protocol cache object
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Number} data - Contains data required to update the liquid class counter within the protocol cache object
     * @memberof actions
     */
    [types.UPDATE_CACHED_PROTOCOL_LIQUID_CLASS_COUNTER]({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_CACHED_PROTOCOL_LIQUID_CLASS_COUNTER, data);
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Duplicates a liquid class within the protocol cache object and assigns it a unique ID
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Number} id - The unique identifier of the liquid class to be duplicated
     * @memberof actions
     */
    [types.DUPLICATE_LIQUID_CLASS]({ state, commit }, id) {
      return new Promise((resolve, reject) => {
        const clonedLiquidClass = JSON.parse(
          JSON.stringify(
            state.cache.liquid_classes.filter((item) => item.id === id)[0]
          )
        );
        clonedLiquidClass.id = state.cache.liquidClassCounter++;
        clonedLiquidClass.name = clonedLiquidClass.name + " - cloned*";
        state.cache.liquid_classes.push(clonedLiquidClass);
        commit(
          types.UPDATE_CACHED_PROTOCOL_LIQUID_CLASSES,
          state.cache.liquid_classes
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
     * Fetches the array of all created liquid classes within the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the liquid class module
     * @returns {array} - The array of all created liquid classes within the protocol cache object
     */
    cachedProtocolLiquidClasses: (state) => state.cache.liquid_classes,
    /**
     * Returns a number that can be assigned as a unique ID for a new liquid class
     * @param {Object} state - (Vuex Arg) The state within the liquid class module
     * @returns {number} - A number that can be assigned as a unique ID for a new liquid class
     */
    cachedProtocolLiquidClassCounter: (state) => state.cache.liquidClassCounter,
  },
};
