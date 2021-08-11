import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import LocationSequenceConfigForm from "@/components/forms/LocationSequenceConfigForm";

const localVue = createLocalVue();

localVue.use(Vuex);

const sampleFormType = "sequence";
const sampleSeqIdx = 0;
const sampleCachedProtocolSequences = [
  {
    name: "tube_rack",
    id: 0,
    locations: [
      { slot_number: 2, slot_name: "tuberack_2", id: 0, wells: ["A1"] },
    ],
    locationCounter: 200,
  },
  {
    name: "well_plate",
    id: 1,
    locations: [
      {
        slot_number: 1,
        slot_name: "wellplate_1",
        id: 0,
        wells: ["A1", "B1", "C1", "F12", "G12", "H12"],
      },
    ],
    locationCounter: 200,
  },
];

describe("shallowMounted LocationSequenceConfigForm", () => {
  let getters;
  let store;
  let wrapper;

  beforeEach(() => {
    getters = {
      cachedProtocolSequences: () => sampleCachedProtocolSequences,
    };

    store = new Vuex.Store({
      getters,
    });

    wrapper = shallowMount(LocationSequenceConfigForm, {
      store,
      localVue,
      propsData: {
        formType: sampleFormType,
        seqIdx: sampleSeqIdx,
      },
    });
  });

  it("renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
