import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import SignOutView from "@/components/views/SignOutView";

const localVue = createLocalVue();

localVue.use(Vuex);

const sampleUserEmail = "bar@acme.com";
const sampleUserName = "bar baz";

describe("shallowMounted SignOutView", () => {
  let getters;
  let store;
  let wrapper;

  beforeEach(() => {
    getters = {
      userEmail: () => sampleUserEmail,
      userName: () => sampleUserName,
    };

    store = new Vuex.Store({
      getters,
    });

    wrapper = shallowMount(SignOutView, {
      store,
      localVue,
    });
  });

  it("renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
