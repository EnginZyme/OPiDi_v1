import Vue from "vue";
import Vuex from "vuex";
import protocols from "./modules/protocols";
import labwares from "./modules/labwares";
import auth from "./modules/auth";

Vue.use(Vuex);

export default new Vuex.Store({
  /**
   * Modules for the Vuex state
   * @type {object}
   * @namespace modules
   */
  modules: {
    /**
     * A Vuex store module for protocol-related data
     * @type {object}
     * @memberof modules
     */
    protocols,
    /**
     * A Vuex store module for labware-related data
     * @type {object}
     * @memberof modules
     */
    labwares,
    /**
     * A Vuex store module for authentication-related data
     * @type {object}
     * @memberof modules
     */
    auth,
  },
});
