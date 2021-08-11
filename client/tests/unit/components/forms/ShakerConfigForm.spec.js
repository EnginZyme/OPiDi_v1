import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import ShakerConfigForm from "@/components/forms/ShakerConfigForm";

const localVue = createLocalVue();

localVue.use(Vuex);

const sampleFormType = "bioshake_3000t";
const sampleStepID = 4;
const sampleCachedProtocolSteps = [
  {
    type: "bioshake_3000t",
    name: "Bioshake 3000T (4)",
    id: 4,
    substeps: [],
    parameters: {
      speed: 1500,
      setpoint: 25,
      tempControl: false,
      cooldown: true,
      duration: 10,
      wait_for_stop: true,
      force_stop: false,
    },
  },
];
const sampleNonTipRackLabwares = [
  {
    name: "wellplate_1",
    labware_name: "test 96 wellplate 2ml 3xT",
    labware_type: "shakerLabware",
    labware_id: "test_96_wellplate_2ml_3xT",
    nickname: "",
    display_name: "test 96 wellplate 2ml 3xT [1]",
    id: 1,
  },
  {
    name: "tuberack_2",
    labware_name: "test tuberack 65 mL tubes",
    labware_type: "tubeRack",
    labware_id: "test_tuberack_65_mL_tubes",
    nickname: "",
    display_name: "test tuberack 65 mL tubes [2]",
    id: 2,
  },
  {
    name: "reservoir_5",
    labware_name: "test slot 3 mL",
    labware_type: "reservoir",
    labware_id: "test_slot_3_mL",
    nickname: "",
    display_name: "test slot 3 mL [5]",
    id: 5,
  },
];

describe("shallowMounted ShakerConfigForm", () => {
  let getters;
  let store;
  let wrapper;

  beforeEach(() => {
    getters = {
      cachedProtocolSteps: () => sampleCachedProtocolSteps,
      nonTipRackLabwares: () => sampleNonTipRackLabwares,
    };

    store = new Vuex.Store({
      getters,
    });

    wrapper = shallowMount(ShakerConfigForm, {
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
