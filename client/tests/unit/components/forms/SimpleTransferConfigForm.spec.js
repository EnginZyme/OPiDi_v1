import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import "../../matchMedia";
import SimpleTransferConfigForm from "@/components/forms/SimpleTransferConfigForm";

const localVue = createLocalVue();

localVue.use(Vuex);

const sampleFormType = "simple_transfer";
const sampleStepID = 2;
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

describe("shallowMounted SimpleTransferConfigForm", () => {
  let getters;
  let store;
  let wrapper;

  beforeEach(() => {
    getters = {
      cachedProtocolLiquidClasses: () => sampleCachedProtocolLiquidClasses,
      cachedProtocolPipettes: () => sampleCachedProtocolPipettes,
      cachedProtocolDeck: () => sampleCachedProtocolDeck,
      cachedProtocolSteps: () => sampleCachedProtocolSteps,
      nonTipRackLabwares: () => sampleNonTipRackLabwares,
    };

    store = new Vuex.Store({
      getters,
    });

    wrapper = shallowMount(SimpleTransferConfigForm, {
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
