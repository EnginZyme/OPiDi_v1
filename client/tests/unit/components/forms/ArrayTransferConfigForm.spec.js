import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import '../../matchMedia';
import ArrayTransferConfigForm from "@/components/forms/ArrayTransferConfigForm";

const localVue = createLocalVue();

localVue.use(Vuex);

const sampleFormType = "array_transfer";
const sampleStepID = 8;
const sampleCachedProtocolSteps = [
  {
    type: "array_transfer",
    name: "Array Transfer (8)",
    id: 8,
    substeps: [],
    parameters: {
      pipette: "right_pipette",
      pipette_obj: {
        name: "(Right) Single Channel 300 uL - Gen 1",
        category: "right_pipette",
      },
      pipette_strategy: "",
      array_map_filename: "demo.csv",
      source_var_map: {
        "buffer 1": {
          slot_name: "tuberack_2",
          slot_number: 2,
          wells: ["A3"],
          destinations: {
            destination_plate: {
              volumes: ["500", "0"],
              wells: ["A1", "B1"],
            },
          },
        },
        "buffer 2": {
          slot_name: "tuberack_2",
          slot_number: 2,
          wells: ["A4"],
          destinations: {
            destination_plate: {
              volumes: ["0", "500"],
              wells: [],
            },
          },
        },
        water: {
          slot_name: "reservoir_5",
          slot_number: 5,
          wells: ["A1"],
          destinations: {
            destination_plate: {
              volumes: ["1000", "1000"],
              wells: ["A1", "B1"],
            },
          },
        },
      },
      destination_var_map: {
        destination_plate: { slot_name: "wellplate_1", slot_number: 1 },
      },
      hasMapConflict: false,
      mappingComplete: true,
      array_map: [
        ["tuberack_2", "A3", "wellplate_1", "A1", "500"],
        ["tuberack_2", "A3", "wellplate_1", "B1", "0"],
        ["tuberack_2", "A4", "wellplate_1", "A1", "0"],
        ["tuberack_2", "A4", "wellplate_1", "B1", "500"],
        ["reservoir_5", "A1", "wellplate_1", "A1", "1000"],
        ["reservoir_5", "A1", "wellplate_1", "B1", "1000"],
      ],
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
];
const sampleCachedProtocolLiquidClasses = [
  {
    name: "Default",
    id: 0,
    liquid_config_object: {
      touch_tip: false,
      blow_out: true,
      carryover: true,
      air_gap: 0,
      blowout_location: "destination well",
      mix_before: { repetitions: 0, volume: 0 },
      mix_after: { repetitions: 0, volume: 0 },
      aspirate_rate: 1,
      dispense_rate: 1,
      blow_out_rate: 1,
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
const sampleCachedProtocolPipettes = [
  {
    name: "(Left) 8 Channel 300 uL - Gen 2",
    category: "left_pipette",
    is_multichannel: true,
  },
  {
    name: "(Right) Single Channel 300 uL - Gen 1",
    category: "right_pipette",
    is_multichannel: true,
  },
];

describe("UnshallowMounted ArrayTransferConfigForm", () => {
  it("has data", () => {
    expect(typeof ArrayTransferConfigForm.data).toBe("function");
  });
});

describe("shallowMounted ArrayTransferConfigForm", () => {
  let getters;
  let store;
  let wrapper;

  beforeEach(() => {
    getters = {
      cachedProtocolSteps: () => sampleCachedProtocolSteps,
      cachedProtocolLiquidClasses: () => sampleCachedProtocolLiquidClasses,
      nonTipRackLabwares: () => sampleNonTipRackLabwares,
      cachedProtocolPipettes: () => sampleCachedProtocolPipettes,
    };

    store = new Vuex.Store({
      getters,
    });

    wrapper = shallowMount(ArrayTransferConfigForm, {
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
