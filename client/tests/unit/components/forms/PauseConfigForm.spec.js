import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import PauseConfigForm from "@/components/forms/PauseConfigForm";

const localVue = createLocalVue();

localVue.use(Vuex);

const sampleFormType = "pause";
const sampleStepID = 3;
const sampleCachedProtocolSteps = [
  {
    type: "pause",
    name: "Pause (3)",
    id: 3,
    substeps: [],
    auto_resume: false,
    pause_time: 15,
  },
];

describe("shallowMounted PauseConfigForm", () => {
  let getters;
  let store;
  let wrapper;

  beforeEach(() => {
    getters = {
      cachedProtocolSteps: () => sampleCachedProtocolSteps,
    };

    store = new Vuex.Store({
      getters,
    });

    wrapper = shallowMount(PauseConfigForm, {
      store,
      localVue,
      propsData: {
        formType: sampleFormType,
        stepID: sampleStepID,
      },
    });
  });

  it("renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
