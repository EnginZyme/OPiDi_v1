import types from "../../../types";

const slugify = require("slugify");

export default {
  /**
   * @returns {object} - The Vuex state
   * @namespace state
   */
  state: () => ({
    /**
     * Serves as a cache storage for deck data of the protocol being viewed/edited by user
     * @type {object}
     * @memberof state
     * @property {number} deck - The deck attribute of the the object in the protocol cache
     */
    cache: {
      deck: {},
    },
  }),
  /**
   * Mutations for the Vuex state
   * @type {object}
   * @namespace mutations
   */
  mutations: {
    /**
     * Updates the value of the deck attribute of the object in the protocol cache
     * @param {Object} state - (Vuex Arg) The state within the deck module
     * @param {Object} obj - An object to be set as the value of the deck attribute of the object in the protocol cache
     * @memberof mutations
     */
    [types.UPDATE_CACHED_PROTOCOL_DECK](state, obj) {
      state.cache.deck = obj;
    },
    /**
     * Resets the value of the deck attribute of the object in the protocol cache to its default value
     * @param {Object} state - (Vuex Arg) The state within the deck module
     * @memberof mutations
     */
    [types.RESET_DECK](state) {
      state.cache.deck = {};
    },
    /**
     * Sets the vaue of a deck slot in the protocol cache object
     * @param {Object} state - (Vuex Arg) The state within the deck module
     * @param {Object} data - An object containing labware data to be stored in a deck slot in the protocol cache object
     * @param {Number} data.id - The slot to recieve the data of the new labware as its value
     * @param {Object} labware - The labware object to be passed as the value of the deck slot
     * @memberof mutations
     */
    [types.ADD_LABWARE](state, data) {
      state.cache.deck.slots[data.id] = {
        name: slugify(`${data.labware.labware_type} ${data.id}`, {
          replacement: "_",
          remove: /[^a-zA-Z\d\s:]/g,
          lower: true,
          strict: true,
        }),
        labware_name: data.labware.labware_name,
        labware_type: data.labware.labware_type,
        labware_id: data.labware.labware_id,
        nickname: "",
        display_name: `${data.labware.labware_name} [${data.id}]`,
        id: data.id,
      };
    },
    /**
     * Resets a deck slot (selected via ID) in the protocol cache object to its default value
     * @param {Object} state - (Vuex Arg) The state object within this context
     * @param {Number} id - The ID of the deck slot to be reset to default value
     * @memberof mutations
     */
    [types.REMOVE_LABWARE_FROM_DECK_SLOT](state, id) {
      state.cache.deck.slots[id] = {};
    },
    /**
     * Updates the nickname attribute of a deck slot (selected by ID) in the protocol cache object
     * If the nickname is an empty string it updates the display_name and name attributes of the deck slot
     * @param {Object} state - (Vuex Arg) The state object within this context
     * @param {Object} data - An object containing data required to update a deck slot's nickname attribute
     * @param {Number} data.id - The ID of the deck slot to be updated
     * @param {String} data.nickname - The new value of the nickname attribute of the chosen deck slot
     * @memberof mutations
     */
    [types.UPDATE_SLOT_NICKNAME](state, data) {
      state.cache.deck.slots[data.id].nickname = data.nickname;
      if (data.nickname) {
        state.cache.deck.slots[
          data.id
        ].display_name = `${data.nickname} [${data.id}]`;
        state.cache.deck.slots[data.id].name =
          slugify(data.nickname, {
            replacement: "_",
            remove: /[^a-zA-Z\s:]/g,
            lower: true,
            strict: true,
          }) + `_${data.id}`;
      } else {
        state.cache.deck.slots[data.id].display_name = `${
          state.cache.deck.slots[data.id].labware_name
        } [${data.id}]`;
        state.cache.deck.slots[data.id].name =
          slugify(state.cache.deck.slots[data.id].labware_type, {
            replacement: "_",
            remove: /[^a-zA-Z\s:]/g,
            lower: true,
            strict: true,
          }) + `_${data.id}`;
      }
    },
    /**
     * Updates the representation of the left pipette object in the protocol cache
     * @param {Object} state - (Vuex Arg) The state object within this local context
     * @param {Object} pipette - An object to be set as representation of the left pipette
     * @memberof mutations
     */
    [types.UPDATE_LEFT_PIPETTE](state, pipette) {
      state.cache.deck.left_pipette.pipette = pipette;
    },
    /**
     * Updates the representation of the right pipette object in the protocol cache
     * @param {Object} state - (Vuex Arg) The state object within this local context
     * @param {Object} pipette - An object to be set as representation of the right pipette
     * @memberof mutations
     */
    [types.UPDATE_RIGHT_PIPETTE](state, pipette) {
      state.cache.deck.right_pipette.pipette = pipette;
    },
    /**
     * Updates the representation of the left tipracks object in the protocol cache
     * @param {Object} state - (Vuex Arg) The state object within this local context
     * @param {Object} tiprack - An object to be set as representation of the left tipracks
     * @memberof mutations
     */
    [types.UPDATE_LEFT_TIPRACKS](state, tipRack) {
      state.cache.deck.left_pipette.tipracks = tipRack;
    },
    /**
     * Updates the representation of the right tipracks object in the protocol cache
     * @param {Object} state - (Vuex Arg) The state object within this local context
     * @param {Object} tiprack - An object to be set as representation of the right tipracks
     * @memberof mutations
     */
    [types.UPDATE_RIGHT_TIPRACKS](state, tipRack) {
      state.cache.deck.right_pipette.tipracks = tipRack;
    },
    /**
     * Updates or deletes the object representation of the left pipette tipracks when any of its dependencies are updated
     * @param {Object} state - (Vuex Arg) The state object within this local context
     * @param {Object} obj - Contains data required to perform CRUD actions on the left pipette tipracks in the protocol cache
     * @param {String} obj.signal - The type of propagated change to be performed on this attribute
     * @param {Number} obj.value.id - The ID of the tiprack to be updated
     * @memberof mutations
     */
    [types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_LEFT_TIPRACKS](state, obj) {
      if (obj.signal === "UPDATE") {
        if (obj.value.labware_type !== "tipRack")
          state.cache.deck.left_pipette.tipracks = state.cache.deck.left_pipette.tipracks.filter(
            (item) => item !== obj.value.id
          );
      } else if (obj.signal === "DELETE") {
        state.cache.deck.left_pipette.tipracks = state.cache.deck.left_pipette.tipracks.filter(
          (item) => item !== obj.value.id
        );
      }
    },
    /**
     * Updates or deletes the object representation of the right pipette tipracks when any of its dependencies are updated
     * @param {Object} state - (Vuex Arg) The state object within this local context
     * @param {Object} obj - Contains data required to perform CRUD actions on the right pipette tipracks in the protocol cache
     * @param {String} obj.signal - The type of propagated change to be performed on this attribute
     * @param {Number} obj.value.id - The ID of the tiprack to be updated
     * @memberof mutations
     */
    [types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_RIGHT_TIPRACKS](state, obj) {
      if (obj.signal === "UPDATE") {
        if (obj.value.labware_type !== "tipRack")
          state.cache.deck.right_pipette.tipracks = state.cache.deck.right_pipette.tipracks.filter(
            (item) => item !== obj.value.id
          );
      } else if (obj.signal === "DELETE") {
        state.cache.deck.right_pipette.tipracks = state.cache.deck.right_pipette.tipracks.filter(
          (item) => item !== obj.value.id
        );
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
     * Commit a mutation to add labware data to a deck slot within the object in the protocol cache
     * Also updates other protocol cache object attributes that have the deck slot as a data dependency
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Labware data to be added to a deck slot within the object in the protocol cache
     * @memberof actions
     */
    [types.ADD_LABWARE]({ state, commit, rootGetters, dispatch }, data) {
      return new Promise((resolve, reject) => {
        commit(types.ADD_LABWARE, data);
        const depObjects = rootGetters.cachedProtocolDependencies.filter(
          (obj) => obj.source === "slot" && obj.source_hash.includes(data.id)
        );
        for (let obj of depObjects) {
          dispatch(obj.atype, {
            signal: "UPDATE",
            sink_hash: obj.sink_hash,
            sink_ppty: obj.sink_ppty,
            value: state.cache.deck.slots[data.id],
          });
        }
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Resets a deck slot (specified by ID) to contain no labware data also it dissociates the slot from
     * other protocol cache object attributes that have it as a data dependency
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Number} id - The ID of the deck slot to be operated on
     * @memberof actions
     */
    [types.REMOVE_LABWARE_FROM_DECK_SLOT]({ state, commit, rootGetters, dispatch }, id) {
      return new Promise((resolve, reject) => {
        const depObjects = rootGetters.cachedProtocolDependencies.filter(
          (obj) => obj.source === "slot" && obj.source_hash.includes(id)
        );
        for (let obj of depObjects) {
          dispatch(obj.atype, {
            signal: "DELETE",
            sink_hash: obj.sink_hash,
            sink_ppty: obj.sink_ppty,
            value: state.cache.deck.slots[id],
          });
          obj.source_hash = "";
        }
        commit(
          types.UPDATE_CACHED_PROTOCOL_DEPENDENCY_LINKS,
          rootGetters.cachedProtocolDependencies.filter(
            (obj) => !(obj.source === "slot" && obj.source_hash.includes(id))
          ),
          { root: true }
        );
        commit(types.REMOVE_LABWARE_FROM_DECK_SLOT, id);
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits a mutation to update the nickname of a deck slot (selected by ID) and updates protocol cache object attributes
     * that have the slot as a data dependency correspondingly
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - Data required to update the nickname assigned to a selected deck slot
     * @param {Number} data.id - The ID of the deck slot to be updated
     * @param {String} data.nickname - The new value of the nickname attribute of the chosen deck slot
     * @memberof actions
     */
    [types.UPDATE_SLOT_NICKNAME](
      { state, commit, rootGetters, dispatch },
      data
    ) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_SLOT_NICKNAME, data);
        const depObjects = rootGetters.cachedProtocolDependencies.filter(
          (obj) => obj.source === "slot" && obj.source_hash.includes(data.id)
        );
        for (let obj of depObjects) {
          dispatch(obj.atype, {
            signal: "UPDATE",
            sink_hash: obj.sink_hash,
            sink_ppty: obj.sink_ppty,
            value: state.cache.deck.slots[data.id],
          });
        }
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Updates the left pipette attribute of the object in the protocol cache and updates protocol cache object
     * attributes that have the left pipette as a data dependency
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} pipette - Data required to update the left pipette attribute of the object in the protocol cache
     * @memberof actions
     */
    [types.UPDATE_LEFT_PIPETTE](
      { state, rootGetters, dispatch, commit },
      pipette
    ) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_LEFT_PIPETTE, pipette);
        const depObjects = rootGetters.cachedProtocolDependencies.filter(
          (obj) =>
            obj.source === "pipette" && obj.source_hash.includes("left_pipette")
        );
        for (let obj of depObjects) {
          dispatch(obj.atype, {
            signal: "UPDATE",
            sink_hash: obj.sink_hash,
            sink_ppty: obj.sink_ppty,
            value: {
              name: `(Left) ${state.cache.deck.left_pipette.pipette.name}`,
              category: "left_pipette",
            },
          });
        }
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Updates the right pipette attribute of the object in the protocol cache and updates protocol cache object
     * attributes that have the right pipette as a data dependency
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} pipette - Data required to update the right pipette attribute of the object in the protocol cache
     * @memberof actions
     */
    [types.UPDATE_RIGHT_PIPETTE](
      { state, rootGetters, dispatch, commit },
      pipette
    ) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_RIGHT_PIPETTE, pipette);
        const depObjects = rootGetters.cachedProtocolDependencies.filter(
          (obj) =>
            obj.source === "pipette" &&
            obj.source_hash.includes("right_pipette")
        );
        for (let obj of depObjects) {
          dispatch(obj.atype, {
            signal: "UPDATE",
            sink_hash: obj.sink_hash,
            sink_ppty: obj.sink_ppty,
            value: {
              name: `(Right) ${state.cache.deck.right_pipette.pipette.name}`,
              category: "right_pipette",
            },
          });
        }
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Adds a dependency object for the left tipracks into the protocol cache object to enable registering
     * of data dependencies between the left tipracks and other protocol cache object attributes
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @memberof actions
     */
    [types.LOAD_LEFT_TIPRACKS_DEPENDENCY_LINKS]({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit(
          types.ADD_CACHED_PROTOCOL_DEPENDENCY_LINK,
          {
            sink: "pipettes_card",
            sink_hash: "",
            sink_ppty: "left_tiprack",
            source: "slot",
            source_hash: state.cache.deck.left_pipette.tipracks,
            atype: types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_LEFT_TIPRACKS,
          },
          { root: true }
        );
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Adds a dependency object for the right tipracks into the protocol cache object to enable registering
     * of data dependencies between the right tipracks and other protocol cache object attributes
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @memberof actions
     */
    [types.LOAD_RIGHT_TIPRACKS_DEPENDENCY_LINKS]({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit(
          types.ADD_CACHED_PROTOCOL_DEPENDENCY_LINK,
          {
            sink: "pipettes_card",
            sink_hash: "",
            sink_ppty: "right_tiprack",
            source: "slot",
            source_hash: state.cache.deck.right_pipette.tipracks,
            atype: types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_RIGHT_TIPRACKS,
          },
          { root: true }
        );
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Updates the left tiprack attribute of the object in the protocol cache and updates protocol cache object
     * attributes that have the left tiprack as a data dependency
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} tipRack - Data required to update the left tiprack attribute of the object in the protocol cache
     * @memberof actions
     */
    [types.UPDATE_LEFT_TIPRACKS]({ commit, rootGetters }, tipRack) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_LEFT_TIPRACKS, tipRack);
        rootGetters.cachedProtocolDependencies.filter(
          (obj) =>
            obj.sink === "pipettes_card" && obj.sink_ppty === "left_tiprack"
        )[0].source_hash = tipRack;
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
     * Updates the right tiprack attribute of the object in the protocol cache and updates protocol cache object
     * attributes that have the right tiprack as a data dependency
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} pipette - Data required to update the right tiprack attribute of the object in the protocol cache
     * @memberof actions
     */
    [types.UPDATE_RIGHT_TIPRACKS]({ commit, rootGetters }, tipRack) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_RIGHT_TIPRACKS, tipRack);
        rootGetters.cachedProtocolDependencies.filter(
          (obj) =>
            obj.sink === "pipettes_card" && obj.sink_ppty === "right_tiprack"
        )[0].source_hash = tipRack;
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
     * Commits a mutation to propagate changes to the left tipracks to other protocol cache object attributes
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} obj - Data required to propagate changes to the left tipracks to other protocol cache object attributes
     * @param {String} obj.signal - The type of propagated change to be performed on this attribute
     * @param {Number} obj.value.id - The ID of the tiprack to be updated
     * @memberof actions
     */
    [types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_LEFT_TIPRACKS]({ commit }, obj) {
      return new Promise((resolve, reject) => {
        commit(types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_LEFT_TIPRACKS, obj);
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Commits a mutation to propagate changes to the right tipracks to other protocol cache object attributes
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} obj - Data required to propagate changes to the right tipracks to other protocol cache object attributes
     * @param {String} obj.signal - The type of propagated change to be performed on this attribute
     * @param {Number} obj.value.id - The ID of the tiprack to be updated
     * @memberof actions
     */
    [types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_RIGHT_TIPRACKS]({ commit }, obj) {
      return new Promise((resolve, reject) => {
        commit(types.PUSH_LINKED_DEPENDENCY_CHANGE_TO_RIGHT_TIPRACKS, obj);
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
     * Fetches the deck attribute of the object in the protocol cache
     * @param {Object} state - (Vuex Arg) The state within the deck module
     * @returns {object} - The deck attribute of the object in the protocol cache
     * @memberof getters
     */
    cachedProtocolDeck: (state) => state.cache.deck,
    /**
     * Fetches
     * @param {Object} state - (Vuex Arg) The state within the deck module
     * @returns {array} - An array of object representations of chosen left and right pipette in the protocol cache object
     * @memberof getters
     */
    cachedProtocolPipettes: (state) => {
      let pipettes = [];
      if (state.cache.deck.left_pipette.pipette.name)
        pipettes.push({
          name: `(Left) ${state.cache.deck.left_pipette.pipette.name}`,
          category: "left_pipette",
          is_multichannel:
            state.cache.deck.left_pipette.pipette.is_multichannel,
        });
      if (state.cache.deck.right_pipette.pipette.name)
        pipettes.push({
          name: `(Right) ${state.cache.deck.right_pipette.pipette.name}`,
          category: "right_pipette",
          is_multichannel:
            state.cache.deck.right_pipette.pipette.is_multichannel,
        });
      return pipettes;
    },
    /**
     * Fetches an array of all selected labware within the protocol cache object that are not tipracks
     * @param {Object} state - (Vuex Arg) The state within the deck module
     * @returns {array} - An array of selected labware that are not tipracks
     * @memberof getters
     */
    nonTipRackLabwares: (state) => {
      return Object.values(state.cache.deck.slots).filter((obj) => {
        if (obj) return obj.labware_type && obj.labware_type !== "tipRack";
        return false;
      });
    },
    /**
     * Fetches an array of all selected labware within the protocol cache object that are tipracks
     * @param {Object} state - (Vuex Arg) The state within the deck module
     * @returns {array} - An array of selected labware that are tipracks
     * @memberof getters
     */
    chosenTipRacks: (state) => {
      return Object.values(state.cache.deck.slots).filter((obj) => {
        if (obj) return obj.labware_type === "tipRack";
        return false;
      });
    },
    /**
     * Returns the content of the first deck slot within the object in the protocol cache
     * @param {Object} state - (Vuex Arg) The state within the deck module
     * @returns {object} - The content of the first deck slot within the object in the protocol cache
     * @memberof getters
     */
    slot1: (state) => state.cache.deck.slots[1],
    /**
     * Returns the content of the first second slot within the object in the protocol cache
     * @param {Object} state - (Vuex Arg) The state within the deck module
     * @returns {object} - The content of the second deck slot within the object in the protocol cache
     * @memberof getters
     */
    slot2: (state) => state.cache.deck.slots[2],
    /**
     * Returns the content of the third deck slot within the object in the protocol cache
     * @param {Object} state - (Vuex Arg) The state within the deck module
     * @returns {object} - The content of the third deck slot within the object in the protocol cache
     * @memberof getters
     */
    slot3: (state) => state.cache.deck.slots[3],
    /**
     * Returns the content of the fourth deck slot within the object in the protocol cache
     * @param {Object} state - (Vuex Arg) The state within the deck module
     * @returns {object} - The content of the fourth deck slot within the object in the protocol cache
     * @memberof getters
     */
    slot4: (state) => state.cache.deck.slots[4],
    /**
     * Returns the content of the fifth deck slot within the object in the protocol cache
     * @param {Object} state - (Vuex Arg) The state within the deck module
     * @returns {object} - The content of the fifth deck slot within the object in the protocol cache
     * @memberof getters
     */
    slot5: (state) => state.cache.deck.slots[5],
    /**
     * Returns the content of the sixth deck slot within the object in the protocol cache
     * @param {Object} state - (Vuex Arg) The state within the deck module
     * @returns {object} - The content of the sixth deck slot within the object in the protocol cache
     * @memberof getters
     */
    slot6: (state) => state.cache.deck.slots[6],
    /**
     * Returns the content of the seventh deck slot within the object in the protocol cache
     * @param {Object} state - (Vuex Arg) The state within the deck module
     * @returns {object} - The content of the seventh deck slot within the object in the protocol cache
     * @memberof getters
     */
    slot7: (state) => state.cache.deck.slots[7],
    /**
     * Returns the content of the eighth deck slot within the object in the protocol cache
     * @param {Object} state - (Vuex Arg) The state within the deck module
     * @returns {object} - The content of the eighth deck slot within the object in the protocol cache
     * @memberof getters
     */
    slot8: (state) => state.cache.deck.slots[8],
    /**
     * Returns the content of the ninth deck slot within the object in the protocol cache
     * @param {Object} state - (Vuex Arg) The state within the deck module
     * @returns {object} - The content of the ninth deck slot within the object in the protocol cache
     * @memberof getters
     */
    slot9: (state) => state.cache.deck.slots[9],
    /**
     * Returns the content of the tenth deck slot within the object in the protocol cache
     * @param {Object} state - (Vuex Arg) The state within the deck module
     * @returns {object} - The content of the tenth deck slot within the object in the protocol cache
     * @memberof getters
     */
    slot10: (state) => state.cache.deck.slots[10],
    /**
     * Returns the content of the eleventh deck slot within the object in the protocol cache
     * @param {Object} state - (Vuex Arg) The state within the deck module
     * @returns {object} - The content of the eleventh deck slot within the object in the protocol cache
     * @memberof getters
     */
    slot11: (state) => state.cache.deck.slots[11],
    /**
     * Returns the content of the twelfth deck slot within the object in the protocol cache
     * @param {Object} state - (Vuex Arg) The state within the deck module
     * @returns {object} - The content of the twelfth deck slot within the object in the protocol cache
     * @memberof getters
     */
    slot12: (state) => state.cache.deck.slots[12],
  },
};
