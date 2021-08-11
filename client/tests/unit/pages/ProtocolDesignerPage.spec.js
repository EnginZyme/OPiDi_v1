import { shallowMount, createLocalVue } from "@vue/test-utils"
import Vuex from "vuex";
import ProtocolDesignerPage from "@/pages/ProtocolDesignerPage"

const localVue = createLocalVue();

localVue.use(Vuex);

describe("shallowMounted ProtocolDesignerPage", () => {
    let getters;
    let store;
    let wrapper;
  
    beforeEach(() => {
      getters = {
        userIsLoggedIn: () => true,
      };
  
      store = new Vuex.Store({
        getters,
      });
  
      wrapper = shallowMount(ProtocolDesignerPage, {
        store,
        localVue,
      });
    });

    it("renders correctly", () => {
        expect(wrapper.element).toMatchSnapshot();
    })
})
