import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import ConfigView from "@/components/views/ConfigView";

const localVue = createLocalVue();

localVue.use(Vuex);

const sampleCachedProtocol = {
  id: 168,
  protocol: {
    dependencies: [],
    metadata: {
      name: "Functionality test protocol",
      description: "test for OPD 2.1.0",
      author: { name: "foo bar", email: "foo@acme.com" },
      is_verified: false,
      is_shared: true,
      created: 1613569949644,
    },
    hasChanged: false,
    deck: {
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
    },
    steps: [],
    liquid_classes: [
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
    ],
    sequences: [],
    stepCounter: 0,
    sequenceCounter: 0,
    liquidClassCounter: 1,
  },
};
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
const sampleProtocolEditorVariables = {
  stepsstepID: -1,
  stepsFormType: "",
  chosenLiquidClassID: "",
  locSeqID: "",
  locSeqCategory: "",
};
const sampleUserAuthToken = "authtoken";

describe("shallowMounted ConfigView", () => {
  let getters;
  let store;
  let wrapper;

  beforeEach(() => {
    getters = {
      cachedProtocol: () => sampleCachedProtocol,
      cachedProtocolLiquidClasses: () => sampleCachedProtocolLiquidClasses,
      protocolEditorVariables: () => sampleProtocolEditorVariables,
      userAuthToken: () => sampleUserAuthToken,
    };

    store = new Vuex.Store({
      getters,
    });

    wrapper = shallowMount(ConfigView, {
      store,
      localVue,
    });
  });

  it("renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
