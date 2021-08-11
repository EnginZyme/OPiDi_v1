import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import LoopConfigForm from "@/components/forms/LoopConfigForm";

const localVue = createLocalVue();

localVue.use(Vuex);

const sampleFormType = "loop";
const sampleStepID = 1;
const sampleCachedProtocolSteps = [
  {
    type: "loop",
    name: "Loop (1)",
    id: 1,
    num_iterations: 3,
    substeps: [
      {
        type: "simple_transfer",
        name: "Simple Transfer (2)",
        id: 2,
        substeps: [],
        parameters: {
          pipette: "right_pipette",
          pipette_obj: {
            name: "(Right) Single Channel 300 uL - Gen 1",
            category: "right_pipette",
          },
          pipette_strategy: "",
          volumes: [100],
          volumes_string: "100",
          source: { slot_number: 5, slot_name: "reservoir_5", wells: ["A1"] },
          destination: {
            slot_number: 1,
            slot_name: "wellplate_1",
            wells: ["D6"],
          },
          liquidClass: "Default",
          liquidClassId: 0,
          tipsStrategy: "ECO",
          offset: {
            source: 1,
            destination: 1,
            source_type: "Bottom",
            destination_type: "Bottom",
          },
        },
      },
    ],
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

describe("shallowMounted LoopConfigForm", () => {
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

    wrapper = shallowMount(LoopConfigForm, {
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
