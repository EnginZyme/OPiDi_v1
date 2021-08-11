import types from "../../types";

export default {
  /**
   * @returns {object} - The Vuex state
   * @namespace state
   */
  state: () => ({
    /**
     * A representation of the user in state
     * @type {object}
     * @memberof state
     * @property {String} name - The name of the logged in user
     * @property {String} email - The email address of the logged in user
     * @property {String} imageURL - The URL pointing to the avatar image of the logged in user
     * @property {boolean} isLoggedIn - Indicates if a user is logged in or not
     * @property {String} aToken - The Google authentication token returned upon user's login
     * @property {String} tokenRefresher - Returns a promise to be used to force the refresh of the Google access token
     * @property {String} tokenExpiryTime - The time when the current saved Google access token will expire
     */
    user: {
      name: "",
      email: "",
      imageURL: "",
      isLoggedIn: false,
      aToken: "",
      tokenRefresher: () => {},
      tokenExpiryTime: 0,
    },
  }),
  /**
   * Mutations for the Vuex state
   * @type {object}
   * @namespace mutations
   */
  mutations: {
    /**
     * Stores the data of the authenticated user in state
     * @memberof mutations
     * @param {Object} state - (Vuex Arg) The state object within the authtentication module
     * @param {Object} userData - An object containing the data of the authenticated user
     * @param {String} userData.name - The name of the authenticated user
     * @param {String} userData.email - The email address of the authenticated user
     * @param {String} userData.imageURL - The URL pointing to an image of the authenticated user
     * @param {Boolean} userData.isLoggedIn - The "logged in" status of the authenticated user
     * @param {String} userData.aToken - The authentication token of the authenticated user
     * @param {String} userData.tokenRefresher - Returns a promise to be used to force the refresh of the Google access token
     * @param {String} userData.tokenExpiryTime - The time when the current saved Google access token will expire
     */
    [types.REGISTER_USER](state, userData) {
      state.user.name = userData.name;
      state.user.email = userData.email;
      state.user.imageURL = userData.imageURL;
      state.user.isLoggedIn = userData.isLoggedIn;
      state.user.aToken = userData.aToken;
      state.user.tokenRefresher = userData.tokenRefresher;
      state.user.tokenExpiryTime = userData.tokenExpiryTime;
    },
    /**
     * Removes the data of the authentication from the store
     * @memberof mutations
     * @param {Object} state - (Vuex Arg) The state object within the authentication module
     */
    [types.DEREGISTER_USER](state) {
      state.user.name = "";
      state.user.email = "";
      state.user.imageURL = "";
      state.user.isLoggedIn = false;
      state.user.aToken = "";
      state.user.tokenRefresher = () => {};
      state.user.tokenExpiryTime = 0;
    },
  },
  /**
   * Actions for the Vuex state
   * @type {object}
   * @namespace actions
   */
  actions: {
    /**
     * Calls the mutation to store the data of authenticated data in state
     * @memberof actions
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @param {Object} userData - An object containing the data of the authenticated user
     * @param {String} userData.name - The name of the authenticated user
     * @param {String} userData.email - The email address of the authenticated user
     * @param {String} userData.imageURL - The URL pointing to an image of the authenticated user
     * @param {Boolean} userData.isLoggedIn - The "logged in" status of the authenticated user
     * @param {String} userData.aToken - The authentication token of the authenticated user
     * @param {String} userData.tokenRefresher - Returns a promise to be used to force the refresh of the Google access token
     * @param {String} userData.tokenExpiryTime - The time when the current saved Google access token will expire
     */
    [types.REGISTER_USER]({ commit }, userData) {
      return new Promise((resolve, reject) => {
        commit(types.REGISTER_USER, userData);
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     *
     * Calls the mutation to remove the data of the authenticated user from state and wipes out cached data on protocols and labwares
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @memberof actions
     */
    [types.DEREGISTER_USER]({ commit, dispatch }) {
      return new Promise((resolve, reject) => {
        commit(types.DEREGISTER_USER);
        commit(types.UNLOAD_PROTOCOLS);
        dispatch(types.UNLOAD_LABWARES);
        dispatch(types.UNLOAD_SLACK_WEBHOOK_OBJECTS);
        resolve();
        reject(new Error("…"));
      });
    },
    /**
     *
     * Ensures that the Google access token stored in state is not expired, otherwise it refreshes it
     * @param {Object} context - (Vuex Arg) Exposes the same set of methods/properties on the store instance
     * @memberof actions
     */
    [types.REFRESH_USER_REGISTRATION]({ state, commit }) {
      return new Promise((resolve, reject) => {
        const now = new Date();
        if (now.getTime() >= state.user.tokenExpiryTime) {
          state.user.tokenRefresher().then((authResponse) => {
            state.user.aToken = authResponse.id_token;
            state.user.tokenExpiryTime = authResponse.expires_at;
            commit(types.REGISTER_USER, state.user);
            resolve();
            reject(new Error("…"));
          });
        } else {
          resolve();
          reject(new Error("…"));
        }
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
     * Fetches an indicator of the presence of an authenticated user from the store
     * @param {Object} state - (Vuex Arg) The state within the authentication module
     * @returns {boolean} - An indicator of the presence of an authenticated user
     * @memberof getters
     */
    userIsLoggedIn: (state) => state.user.isLoggedIn,
    /**
     * Fetches a URL pointing to the avatar of the authenticated user from the store
     * @param {Object} state - (Vuex Arg) The state within the authentication module
     * @returns {String} - A URL pointing to the avatar of the authenticated user
     * @memberof getters
     */
    userImageURL: (state) => state.user.imageURL,
    /**
     * Fetches the name of the authenticated user from the store
     * @param {Object} state - (Vuex Arg) The state within the authentication module
     * @returns {boolean} - The name of the authenticated user
     * @memberof getters
     */
    userName: (state) => state.user.name,
    /**
     * Fetches the email address of the authenticated user from the store
     * @param {Object} state - (Vuex Arg) The state within the authentication module
     * @returns {boolean} - The email address of the authenticated user
     * @memberof getters
     */
    userEmail: (state) => state.user.email,
    /**
     * Fetches the Google authentication token of the authenticated user from the store
     * @param {Object} state - (Vuex Arg) The state within the authentication module
     * @returns {boolean} - The Google authentication token of the authenticated user
     * @memberof getters
     */
    userAuthToken: (state) => state.user.aToken,
  },
};
