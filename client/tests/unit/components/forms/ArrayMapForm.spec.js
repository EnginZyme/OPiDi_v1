import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import '../../matchMedia';
import ArrayMapForm from "@/components/forms/ArrayMapForm";

const localVue = createLocalVue();

localVue.use(Vuex);

const sampleStepID = 8;
const samplePipette = {
  name: "(Right) Single Channel 300 uL - Gen 1",
  category: "right_pipette",
  is_multichannel: true,
};
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
const sampleCachedProtocolDeck = {
  left_pipette: {
    pipette: {
      name: "8 Channel 300 uL - Gen 2",
      id: "p300_multi_gen2",
      is_multichannel: true,
    },
    tipracks: [8],
  },
  right_pipette: {
    pipette: {
      name: "Single Channel 300 uL - Gen 1",
      id: "p300_single",
      is_multichannel: true,
    },
    tipracks: [7],
  },
  slots: {
    "1": {
      name: "wellplate_1",
      labware_name: "test 96 wellplate 2ml 3xT",
      labware_type: "shakerLabware",
      labware_id: "test_96_wellplate_2ml_3xT",
      nickname: "",
      display_name: "test 96 wellplate 2ml 3xT [1]",
      id: 1,
    },
    "2": {
      name: "tuberack_2",
      labware_name: "test tuberack 65 mL tubes",
      labware_type: "tubeRack",
      labware_id: "test_tuberack_65_mL_tubes",
      nickname: "",
      display_name: "test tuberack 65 mL tubes [2]",
      id: 2,
    },
    "3": {},
    "4": {},
    "5": {
      name: "reservoir_5",
      labware_name: "test slot 3 mL",
      labware_type: "reservoir",
      labware_id: "test_slot_3_mL",
      nickname: "",
      display_name: "test slot 3 mL [5]",
      id: 5,
    },
    "6": {},
    "7": {
      name: "tiprack_7",
      labware_name: "Opentrons 96 Tip Rack 0.3 mL",
      labware_type: "tipRack",
      labware_id: "opentrons_96_tiprack_300ul",
      nickname: "",
      display_name: "Opentrons 96 Tip Rack 0.3 mL [7]",
      id: 7,
    },
    "8": {
      name: "tiprack_8",
      labware_name: "Opentrons 96 Tip Rack 0.3 mL",
      labware_type: "tipRack",
      labware_id: "opentrons_96_tiprack_300ul",
      nickname: "",
      display_name: "Opentrons 96 Tip Rack 0.3 mL [8]",
      id: 8,
    },
    "9": {},
    "10": {},
    "11": {},
    "12": {},
  },
};
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

describe("UnshallowMounted ArrayMapForm", () => {
  it("has data", () => {
    expect(typeof ArrayMapForm.data).toBe("function");
  });
});

describe("shallowMounted ArrayMapForm", () => {
  let getters;
  let store;
  let wrapper;

  beforeEach(() => {
    getters = {
      cachedProtocolSteps: () => sampleCachedProtocolSteps,
      cachedProtocolDeck: () => sampleCachedProtocolDeck,
      nonTipRackLabwares: () => sampleNonTipRackLabwares,
      cachedProtocolPipettes: () => sampleCachedProtocolPipettes,
    };

    store = new Vuex.Store({
      getters,
    });

    wrapper = shallowMount(ArrayMapForm, {
      store,
      localVue,
      propsData: {
        shouldDisplayModal: true,
        stepID: sampleStepID,
        pipette: samplePipette,
      },
    });
  });

  it("renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
