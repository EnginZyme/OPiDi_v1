import deck from "./deck";
import liquidClass from "./liquidClass";
import locationSequence from "./locationSequence";
import steps from "./steps";
import types from "../../../types";
import Axios from "axios";
import { sendLogToLogStream } from "../../../utils";
import { OBJECT_API_URL as API_URL } from "../../../urls";
import { getDefaultProtocol } from "../../defaultData/protocolData";

export default {
  /**
   * @returns {object} - The Vuex state
   * @namespace state
   */
  state: () => ({
    /**
     * Will store all the exisiting protocols fetched from DB
     * @type {array}
     * @memberof state
     */
    protocols: [],
    /**
     * Serves as a cache storage for metadata and dependency data of the protocol being viewed/edited by user
     * @type {object}
     * @memberof state
     * @property {number} id - The unique ID of the protocol being viewed/edited by user
     * @property {boolean} hasChanged - An indicator of whether the user has made at least one change to the viewed protocol
     * @property {array} dependencies - An array of objects that represent the data dependencies between protocol attributes
     */
    cache: {
      id: -1,
      hasChanged: false,
      metadata: {},
      dependencies: [],
    },
  }),
  /**
   * Mutations for the Vuex state
   * @type {object}
   * @namespace mutations
   */
  mutations: {
    /**
     * Saves an array of protocol objects into the store
     * @param {Object} state - (Vuex Arg) The state within the protocol module
     * @param {Array.<Object>} protocols - An array of protocol objects to be saved in the store
     * @memberof mutations
     */
    [types.LOAD_PROTOCOLS](state, protocols) {
      state.protocols = [];
      state.protocols.push(...protocols);
    },
    /**
     * Removes the stored protocol objects from the store
     * @param {Object} state - (Vuex Arg) The state within the protocol module
     * @memberof mutations
     */
    [types.UNLOAD_PROTOCOLS](state) {
      state.protocols = [];
    },
    /**
     * Saves the object representation of a created protocol to the store
     * @param {Object} state - (Vuex Arg) The state within the protocol module
     * @param {Object} protocol - A protocol object to be saved to the store
     * @memberof mutations
     */
    [types.CREATE_PROTOCOL](state, protocol) {
      state.protocols.push(protocol);
    },
    /**
     * Removes a deleted protocol object (specified by ID) from the store
     * @param {Object} state - (Vuex Arg) The state within the protocol module
     * @param {Number} id - The ID of the protocol object to be removed from the store
     * @memberof mutations
     */
    [types.DELETE_PROTOCOL](state, id) {
      state.protocols.splice(
        state.protocols.findIndex((protocol) => protocol.id === parseInt(id)),
        1
      );
    },
    /**
     * Updates the description of the protocol object in the protocol cache
     * @param {Object} state - (Vuex Arg) The state within the protocol module
     * @param {String} data - A new description of the protocol
     * @memberof mutations
     */
    [types.UPDATE_CACHED_PROTOCOL_DESCRIPTION](state, data) {
      state.cache.metadata.description = data;
    },
    /**
     * Updates the name of the protocol object in the protocol cache
     * @param {Object} state -(Vuex Arg) The state within the protocol module
     * @param {String} data - A new name for the protocol
     * @memberof mutations
     */
    [types.UPDATE_CACHED_PROTOCOL_NAME](state, data) {
      state.cache.metadata.name = data;
    },
    /**
     * Updates the shared status of the protocol object in the protocol cache
     * @param {Object} state - (Vuex Arg) The state within the protocol module
     * @param {Boolean} data - The updated shared status of the protocol
     * @memberof mutations
     */
    [types.UPDATE_CACHED_PROTOCOL_SHARED_STATUS](state, data) {
      state.cache.metadata.is_shared = data;
    },
    /**
     * Updates the verifcation status of the protocol object in the protocol cache
     * @param {Object} state - (Vuex Arg) The state within the protocol module
     * @param {Boolean} data - The updated verification status of the protocol
     * @memberof mutations
     */
    [types.UPDATE_CACHED_PROTOCOL_VERIFICATION_STATUS](state, data) {
      state.cache.metadata.is_verified = data;
    },
    /**
     * Updates the retirement status of the protocol object in the protocol cache
     * @param {Object} state - (Vuex Arg) The state within the protocol module
     * @param {Boolean} data - The updated retirement status of the protocol
     * @memberof mutations
     */
    [types.UPDATE_CACHED_PROTOCOL_RETIREMENT_STATUS](state, data) {
      state.cache.metadata.is_retired = data;
    },
    /**
     * Updates the ID of the protocol object in the protocol cache
     * @param {Object} state - (Vuex Arg) The state within the protocol module
     * @param {Number} id - The ID of the object to be stored in the protocol cache
     * @memberof mutations
     */
    [types.UPDATE_CACHED_PROTOCOL_ID](state, id) {
      state.cache.id = id;
    },
    /**
     * Resets the ID of the protocl object in the protocol cache to the default value
     * @param {Object} state - (Vuex Arg) The state within the protocol module
     * @memberof mutations
     */
    [types.RESET_CACHED_PROTOCOL_ID](state) {
      state.cache.id = null;
    },
    /**
     * Updates the dependencies attribute of the object in the protocol cache
     * @param {Object} state - (Vuex Arg) The state within the protocol module
     * @param {Array.<Object>} data - An array of dependencies to be saved to the protocol cache
     * @memberof mutations
     */
    [types.UPDATE_CACHED_PROTOCOL_DEPENDENCY_LINKS](state, data) {
      state.cache.dependencies = data;
    },
    /**
     * Creates a duplicate of a dependency object in the protocol cache typically triggered
     * by a duplication of a protocol attribute (eg. duplication of a step, or location sequence).
     * @param {Object} state - (Vuex Arg) The state within the protocol module
     * @param {Object} data - An object containing data to locate the dependency object to be duplicated
     * @param {String} data.sink - A key to identify the dependency object to be duplicated
     * @param {Number} data.oldIdx - A key to identify the dependency object to be duplicated
     * @param {Number} data.newIdx - A value to make the duplicate dependency object unique
     * @memberof mutations
     */
    [types.DUPLICATE_CACHED_PROTOCOL_DEPENDENCY_LINK](state, data) {
      let parentDeps = state.cache.dependencies.filter(
        (item) => item.sink === data.sink && item.sink_hash === data.oldIdx
      );
      for (let obj of parentDeps) {
        let cloneObj = JSON.parse(JSON.stringify(obj));
        cloneObj.sink_hash = data.newIdx;
        state.cache.dependencies.push(cloneObj);
      }
    },
    /**
     * Resets the dependencies in the protocol object to the default value
     * @param {Object} state - (Vuex Arg) The state within the protocol module
     * @memberof mutations
     */
    [types.RESET_CACHED_PROTOCOL_DEPENDENCY_LINKS](state) {
      state.cache.dependencies = [];
    },
    /**
     * Updates the metadata attribute of the object in the protocol cache
     * @param {Object} state - (Vuex Arg) The state within the protocol module
     * @param {Object} data - A protocol metadata object to be saved to the protocol cache
     * @memberof mutations
     */
    [types.UPDATE_CACHED_PROTOCOL_METADATA](state, data) {
      state.cache.metadata = data;
    },
    /**
     * Resets the metadata atrribute of the object in the protocol cache to its default value
     * @param {Object} state - (Vuex Arg) The state within the protocol module
     * @memberof mutations
     */
    [types.RESET_PROTOCOL_METADATA](state) {
      state.cache.metadata = {};
    },
    /**
     * Records any change the user makes to the viewed/edited protocol
     * @param {Object} state - (Vuex Arg) The state within the protocol module
     * @memberof mutations
     */
    [types.REGISTER_PROCOTOL_CACHE_CHANGE](state) {
      state.cache.hasChanged = true;
    },
    /**
     * Resets the record of the users changes to the viewed/edited protocol
     * @param {Object} state - (Vuex Arg) The state within the protocol module
     * @memberof mutations
     */
    [types.RESET_PROTOCOL_CHANGE_REGISTER](state) {
      state.cache.hasChanged = false;
    },
    /**
     * Saves a dependency object into the dependencies attribute of the object in the protocol cache
     * @param {Object} state - (Vuex Arg) The state within the protocol module
     * @param {Object} data - A dependency object to be saved into the dependencies of the object in the protocol cache
     * @memberof mutations
     */
    [types.ADD_CACHED_PROTOCOL_DEPENDENCY_LINK](state, data) {
      state.cache.dependencies.push(data);
    },
  },
  /**
   * Actions for the Vuex state
   * @type {object}
   * @namespace actions
   */
  actions: {
    /**
     * Fetches all protocols from an endpoint and saves them to the store
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @memberof actions
     */
    [types.LOAD_PROTOCOLS]({ commit, rootGetters }) {
      return new Promise((resolve, reject) => {
        Axios.get(`${API_URL}/protocol/`, {
          headers: {
            Authorization: rootGetters.userAuthToken,
          },
        }).then((response) => {
          commit(types.LOAD_PROTOCOLS, response.data);
        });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Creates a protocol via and endpoint, saves it to the protocol cache, and logs the action to AWS Cloudwatch
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} metadata - An object containing the name and description of the protocol to be created
     * @param {String} metadata.name - The name of the protocol to be created
     * @param {String} metadata.description - The description of the protocol to be created
     * @memberof actions
     */
    [types.CREATE_PROTOCOL](
      { commit, getters, dispatch, rootGetters },
      metadata
    ) {
      return new Promise((resolve, reject) => {
        Axios.post(
          `${API_URL}/protocol/`,
          getDefaultProtocol(
            getters.userName,
            getters.userEmail,
            metadata.name,
            metadata.description
          ),
          {
            headers: {
              Authorization: rootGetters.userAuthToken,
            },
          }
        ).then((response) => {
          commit(types.CREATE_PROTOCOL, response.data);
          dispatch(types.VIEW_PROTOCOL, response.data);
          sendLogToLogStream(
            JSON.stringify(
              JSON.parse(`{
                "user": "${rootGetters.userEmail}",
                "action": "CREATE",
                "protocol_ID": "${response.data.id}",
                "summary": "${rootGetters.userName} CREATED Protocol with ID: ${response.data.id}",
                "errors": false
              }`)
            ),
            rootGetters.userAuthToken
          );
          resolve(response.data.id);
          reject(response);
        });
      });
    },
    /**
     * Creates a new protocol from the object in the protocol cache (which gets assigned a new unique ID)
     * and logs the action to AWS CloudWatch
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @memberof actions
     */
    [types.CLONE_PROTOCOL]({ getters, rootGetters, dispatch }) {
      return new Promise((resolve, reject) => {
        const oldProtocolId = getters.cachedProtocol.id;
        let newProtocol = JSON.parse(
          JSON.stringify(getters.cachedProtocol.protocol)
        );
        newProtocol.metadata.author.name = getters.userName;
        newProtocol.metadata.author.email = getters.userEmail;
        newProtocol.metadata.is_verified = false;
        newProtocol.metadata.is_retired = false;
        newProtocol.metadata.is_shared = false;
        newProtocol.metadata.created = Date.now();
        let date = new Date(newProtocol.metadata.created);
        newProtocol.metadata.name += ` - Cloned on ${date}`;
        newProtocol.metadata.description += ` - Cloned on ${date}`;
        Axios.post(
          `${API_URL}/protocol/`,
          {
            protocol: newProtocol,
          },
          {
            headers: {
              Authorization: rootGetters.userAuthToken,
            },
          }
        ).then((response) => {
          dispatch(types.LOAD_PROTOCOLS);
          dispatch(types.VIEW_PROTOCOL, response.data);
          sendLogToLogStream(
            JSON.stringify(
              JSON.parse(`{
                "user": "${rootGetters.userEmail}",
                "action": "CLONE",
                "protocol_ID": "${response.data.id}",
                "summary": "${rootGetters.userName} CLONED Protocol with ID: ${oldProtocolId} to new ID: ${response.data.id}",
                "errors": false
              }`)
            ),
            rootGetters.userAuthToken
          );
          resolve(response.data.id);
          reject(response);
        });
      });
    },
    /**
     * Puts a user selected protocol object in the protocol cache (required for viewing/editing a protocol)
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {*} protocol - A protocol object to be put into the protocol cache
     * @memberof actions
     */
    [types.VIEW_PROTOCOL]({ commit, dispatch }, protocol) {
      return new Promise((resolve, reject) => {
        commit(
          types.UPDATE_CACHED_PROTOCOL_ID,
          JSON.parse(JSON.stringify(protocol.id))
        );
        commit(types.RESET_PROTOCOL_CHANGE_REGISTER);
        commit(
          types.UPDATE_CACHED_PROTOCOL_METADATA,
          JSON.parse(JSON.stringify(protocol.protocol.metadata))
        );
        commit(
          types.UPDATE_CACHED_PROTOCOL_STEP_COUNTER,
          JSON.parse(JSON.stringify(protocol.protocol.stepCounter)),
          { root: true }
        );
        commit(
          types.UPDATE_CACHED_PROTOCOL_SEQUENCE_COUNTER,
          JSON.parse(JSON.stringify(protocol.protocol.sequenceCounter)),
          { root: true }
        );
        commit(
          types.UPDATE_CACHED_PROTOCOL_LIQUID_CLASS_COUNTER,
          JSON.parse(JSON.stringify(protocol.protocol.liquidClassCounter)),
          { root: true }
        );
        commit(
          types.UPDATE_CACHED_PROTOCOL_STEPS,
          JSON.parse(JSON.stringify(protocol.protocol.steps)),
          { root: true }
        );
        commit(
          types.UPDATE_CACHED_PROTOCOL_DECK,
          JSON.parse(JSON.stringify(protocol.protocol.deck)),
          { root: true }
        );
        commit(
          types.UPDATE_CACHED_PROTOCOL_LIQUID_CLASSES,
          JSON.parse(JSON.stringify(protocol.protocol.liquid_classes)),
          { root: true }
        );
        commit(
          types.UPDATE_CACHED_PROTOCOL_LOCATION_SEQUENCES,
          JSON.parse(JSON.stringify(protocol.protocol.sequences)),
          { root: true }
        );
        dispatch(types.LOAD_CACHED_PROTOCOL_DEPENDENCY_LINKS);
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Parses a protocol object and generates an array of dependencies objects (that describe the data dependencies
     * between attributes of the protocol object) then it saves them to the protocol cache
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @memberof actions
     */
    [types.LOAD_CACHED_PROTOCOL_DEPENDENCY_LINKS]({ dispatch, rootState }) {
      return new Promise((resolve, reject) => {
        function loadTransferSteps(steps) {
          if (steps.length === 0) return;

          for (let step of steps) {
            if (step.type === "array_transfer")
              dispatch(types.LOAD_ARRAY_TRANSFER_DEPENDENCY_LINKS, step, { root: true });
            else if (step.type === "simple_transfer")
              dispatch(types.LOAD_SIMPLE_TRANSFER_DEPENDENCY_LINKS, step, { root: true });
            else if (step.type === "sequence_transfer")
              dispatch(types.LOAD_SEQUENCE_TRANSFER_DEPENDENCY_LINKS, step, {
                root: true,
              });

            loadTransferSteps(step.substeps);
          }
        }

        loadTransferSteps(rootState.protocols.steps.cache.steps);

        for (let sequence of rootState.protocols.locationSequence.cache
          .sequences) {
          for (let location of sequence.locations) {
            dispatch(
              types.LOAD_LOCATION_DEPENDENCY_LINKS,
              {
                seqIdx: sequence.id,
                location,
              },
              { root: true }
            );
          }
        }

        dispatch(types.LOAD_LEFT_TIPRACKS_DEPENDENCY_LINKS, { root: true });
        dispatch(types.LOAD_RIGHT_TIPRACKS_DEPENDENCY_LINKS, { root: true });

        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Updates the protocol (with an ID same as that of the one in the protocol cache) in the remote protocols DB with
     * the contents of the protocol cache via an endpoint
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @memberof actions
     */
    [types.SAVE_PROTOCOL_CACHE]({ commit, state, rootState, rootGetters, dispatch }) {
      return new Promise((resolve, reject) => {
        Axios.put(
          `${API_URL}/protocol/${state.cache.id}`,
          {
            id: state.cache.id,
            protocol: {
              metadata: state.cache.metadata,
              deck: rootState.protocols.deck.cache.deck,
              steps: rootState.protocols.steps.cache.steps,
              liquid_classes:
                rootState.protocols.liquidClass.cache.liquid_classes,
              sequences: rootState.protocols.locationSequence.cache.sequences,
              stepCounter: rootState.protocols.steps.cache.stepCounter,
              sequenceCounter:
                rootState.protocols.locationSequence.cache.sequenceCounter,
              liquidClassCounter:
                rootState.protocols.liquidClass.cache.liquidClassCounter,
            },
          },
          {
            headers: {
              Authorization: rootGetters.userAuthToken,
            },
          }
        ).then(() => {
          commit(types.RESET_PROTOCOL_CHANGE_REGISTER);
          dispatch(types.LOAD_PROTOCOLS);
        });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Deletes a protocol from the remote protocols DB given its unique ID and logs this action to AWS Cloudwatch
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Number} id - The unique ID of the protocol to be deleted from the remote protocols DB
     * @memberof actions
     */
    [types.DELETE_PROTOCOL]({ commit, rootGetters }, id) {
      return new Promise((resolve, reject) => {
        Axios.delete(`${API_URL}/protocol/${id}`, {
          headers: {
            Authorization: rootGetters.userAuthToken,
          },
        }).then((response) => {
          commit(types.DELETE_PROTOCOL, id);
          sendLogToLogStream(
            JSON.stringify(
              JSON.parse(`{
                "user": "${rootGetters.userEmail}",
                "action": "DELETE",
                "protocol_ID": "${id}",
                "summary": "${rootGetters.userName} DELETE Protocol with ID: ${id}",
                "errors": false
              }`)
            ),
            rootGetters.userAuthToken
          );
          resolve(response);
          reject(new Error(response));
        });
      });
    },
    /**
     * Updates the shared status of the object in the protocol cache
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Boolean} data - A value to update the shared status of the object in the protocol cache
     * @memberof actions
     */
    [types.UPDATE_CACHED_PROTOCOL_SHARED_STATUS]({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_CACHED_PROTOCOL_SHARED_STATUS, data);
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE);
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Updates the retirement status of the object in the protocol cache
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Boolean} data - A value to update the retirement status of the object in the protocol cache
     * @memberof actions
     */
    [types.UPDATE_CACHED_PROTOCOL_RETIREMENT_STATUS]({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_CACHED_PROTOCOL_RETIREMENT_STATUS, data);
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE);
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Updates the verification status of the object in the protocol cache
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Boolean} data - A value to update the verification status of the object in the protocol cache
     * @memberof actions
     */
    [types.UPDATE_CACHED_PROTOCOL_VERIFICATION_STATUS]({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_CACHED_PROTOCOL_VERIFICATION_STATUS, data);
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE);
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Updates the description of the object in the protocol cache
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {String} data - A value to update the description of the object in the protocol cache
     * @memberof actions
     */
    [types.UPDATE_CACHED_PROTOCOL_DESCRIPTION]({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_CACHED_PROTOCOL_DESCRIPTION, data);
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE);
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Updates the name of the object in the protocol cache
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {String} data - A value to update the name of the object in the protocol cache
     * @memberof actions
     */
    [types.UPDATE_CACHED_PROTOCOL_NAME]({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.UPDATE_CACHED_PROTOCOL_NAME, data);
        commit(types.REGISTER_PROCOTOL_CACHE_CHANGE);
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Resets the object in the protocol cache to its default value
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @memberof actions
     */
    [types.RESET_PROTOCOL_CACHE]({ commit }) {
      return new Promise((resolve, reject) => {
        commit(types.RESET_DECK, null, { root: true });
        commit(types.RESET_CACHED_PROTOCOL_DEPENDENCY_LINKS, null, { root: true });
        commit(types.RESET_LIQUID_CLASSES, null, { root: true });
        commit(types.RESET_PROTOCOL_METADATA, null, { root: true });
        commit(types.RESET_PROTOCOL_CHANGE_REGISTER, null, { root: true });
        commit(types.RESET_CACHED_PROTOCOL_ID, null, { root: true });
        commit(types.RESET_LOCATION_SEQUENCES, null, { root: true });
        commit(types.RESET_STEPS, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Resets the protocol cache object attributes that track user interaction with protocol attribute forms/views
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @memberof actions
     */
    [types.RESET_PROTOCOL_EDITOR_VARIABLES]({ commit }) {
      return new Promise((resolve, reject) => {
        commit(types.RESET_STEP_VARIABLES, null, { root: true });
        commit(types.RESET_LIQUID_CLASS_VARIABLES, null, { root: true });
        commit(types.RESET_LOCATION_SEQUENCE_VARIABLES, null, { root: true });
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     * Adds a dependency object to the dependencies of the object in the protocol cache
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} data - A dependency object to be saved to the dependencies of the object in the protocol cache
     * @memberof actions
     */
    [types.ADD_CACHED_PROTOCOL_DEPENDENCY_LINK]({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.ADD_CACHED_PROTOCOL_DEPENDENCY_LINK, data);
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
     * Returns an array of all protocol objects within the store
     * @param {Object} state - The state object within this local context
     * @returns {array} - An array of all protocol objects in the store
     * @memberof getters
     */
    allProtocols: (state) => state.protocols,
    /**
     * Returns an array of the protocols that the current user created
     * @param {Object} state - The state object within this local context
     * @param {*} _ - Ignores the second variable passed by Vuex to this getter
     * @param {Object} rootState - The root state object within the store
     * @returns {array} - An array of the protocols that the current user created
     * @memberof getters
     */
    userProtocols: (state, _, rootState) =>
      state.protocols.filter(
        (protocol) =>
          protocol.protocol.metadata.author.email === rootState.auth.user.email
      ),
    /**
     * Returns an array of the protocols that have been shared by their creators
     * @param {Object} state - The state object within this local context
     * @returns {object} - An array of the protocols that have been shared by their creators
     * @memberof getters
     */
    sharedProtocols: (state) =>
      state.protocols.filter(
        (protocol) => protocol.protocol.metadata.is_shared
      ),
    /**
     * Fetches the object stored in the protocol cache
     * @param {Object} state - The state object within this local context
     * @param {*} _ - Ignores the second variable passed by Vuex to this getter
     * @param {Object} rootState - The root state object within the store
     * @returns {object} - The object stored in the protocol cache
     * @memberof getters
     */
    cachedProtocol: (state, _, rootState) => ({
      id: state.cache.id,
      protocol: {
        dependencies: state.cache.dependencies,
        metadata: state.cache.metadata,
        hasChanged: state.cache.hasChanged,
        deck: rootState.protocols.deck.cache.deck,
        steps: rootState.protocols.steps.cache.steps,
        liquid_classes: rootState.protocols.liquidClass.cache.liquid_classes,
        sequences: rootState.protocols.locationSequence.cache.sequences,
        stepCounter: rootState.protocols.steps.cache.stepCounter,
        sequenceCounter:
          rootState.protocols.locationSequence.cache.sequenceCounter,
        liquidClassCounter:
          rootState.protocols.liquidClass.cache.liquidClassCounter,
      },
    }),
    /**
     * Fetches the protocol cache object attributes that track user interaction with protocol attribute forms/views
     * @param {*} _ - Ignores the first variable Vuex passes to this getter
     * @param {*} __ - Ignores the second variable Vuex passes to this getter
     * @param {*} rootState - The root state within the store
     * @returns {object} - The protocol cache object attributes that track user interaction with protocol attribute forms/views
     * @memberof getters
     */
    protocolEditorVariables: (_, __, rootState) => ({
      ...rootState.protocols.steps.vars,
      ...rootState.protocols.liquidClass.vars,
      ...rootState.protocols.locationSequence.vars,
    }),
    /**
     * Fetches an indicator of whether the user has made a change to the object in the protocol cache
     * @param {Object} state - (Vuex Arg) The state within the protocol module
     * @returns {boolean} - An indicator of whether the user has made a change to the object in the protocol cache
     * @memberof getters
     */
    cacheChangeRegister: (state) => state.cache.hasChanged,
    /**
     * Fetches the value of the name attribute of the object in the protocol cache
     * @param {Object} state - (Vuex Arg) The state within the protocol module
     * @returns {String} - The value of the name attribute of the object in the protocol cache
     * @memberof getters
     */
    cachedProtocolName: (state) => state.cache.metadata.name,
    /**
     * Fetches the value of the description attribute of the object in the protocol cache
     * @param {Object} state - (Vuex Arg) The state within the protocol module
     * @returns {String} - The value of the description attribute of the object in the protocol cache
     * @memberof getters
     */
    cachedProtocolDescription: (state) => state.cache.metadata.description,
    /**
     * Fetches the name of the creator of the object in the protocol cache
     * @param {Object} state - (Vuex Arg) The state within the protocol module
     * @returns {String} - The name of the creator of the object in the protocol cache
     * @memberof getters
     */
    cachedProtocolAuthor: (state) => state.cache.metadata.author.name,
    /**
     * Fetches the dependency objects of the object in the protocol cache
     * @param {Object} state - (Vuex Arg) The state within the protocol module
     * @returns {array} - The value of the dependencies attribute of the object stored in the protocol cache
     * @memberof getters
     */
    cachedProtocolDependencies: (state) => state.cache.dependencies,
    /**
     * Fetches the creation date of the object in the protocol cache
     * @param {Object} state - (Vuex Arg) The state within the protocol module
     * @returns {String} - The creation date of the object in the protocol cache
     * @memberof getters
     */
    cachedProtocolCreated: (state) => {
      let date = new Date(state.cache.metadata.created);
      return date.toDateString();
    },
    /**
     * Fetches the verification status of the object in the protocol cache
     * @param {Object} state - (Vuex Arg) The state within the protocol module
     * @returns {boolean} - The verification status of the object in the protocol cache
     * @memberof getters
     */
    cachedProtocolIsVerified: (state) => state.cache.metadata.is_verified,
    /**
     * Fetches the share status of the object in the protocol cache
     * @param {Object} state - (Vuex Arg) The state within the protocol module
     * @returns {boolean} - The share status of the object in the protocol cache
     * @memberof getters
     */
    cachedProtocolIsShared: (state) => state.cache.metadata.is_shared,
    /**
     * Fetches the share status of the object in the protocol cache
     * @param {Object} state - (Vuex Arg) The state within the protocol module
     * @returns {boolean} - The share status of the object in the protocol cache
     */
    cachedProtocolIsRetired: (state) => state.cache.metadata.is_retired,
  },
  /**
   * Modules for the Vuex state
   * @type {object}
   * @namespace modules
   */
  modules: {
    /**
     * A Vuex store module for the deck attribute of the protocol object
     * @type {object}
     * @memberof modules
     */
    deck,
    /**
     * A Vuex store module for the liquidClass attribute of the protocol object
     * @type {object}
     * @memberof modules
     */
    liquidClass,
    /**
     * A Vuex store module for the locationSequence attribute of the protocol object
     * @type {object}
     * @memberof modules
     */
    locationSequence,
    /**
     * A Vuex store module for the steps attribute of the protocol object
     * @type {object}
     * @memberof modules
     */
    steps,
  },
};
