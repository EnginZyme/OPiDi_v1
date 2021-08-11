import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import SequenceTransferConfigForm from "@/components/forms/SequenceTransferConfigForm";

const localVue = createLocalVue();

localVue.use(Vuex);

const sampleFormType = "sequence_transfer";
const sampleStepID = 0;
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
const sampleCachedProtocolSteps = [
  {
    type: "sequence_transfer",
    name: "Sequence Transfer (0)",
    id: 0,
    substeps: [],
    parameters: {
      pipette: "right_pipette",
      pipette_obj: {
        name: "(Right) Single Channel 300 uL - Gen 1",
        category: "right_pipette",
      },
      pipette_strategy: "",
      volumes: [250],
      volumes_string: "250",
      source_sequence: "tube_rack",
      sourceSequenceId: 0,
      destination_sequence: "well_plate",
      destinationSequenceId: 1,
      liquidClass: "Default",
      liquidClassId: 0,
      tipsStrategy: "STANDARD",
      offset: {
        source: 1,
        destination: 1,
        source_type: "Bottom",
        destination_type: "Bottom",
      },
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

describe("shallowMounted SequenceTransferConfigForm", () => {
  let getters;
  let store;
  let wrapper;

  beforeEach(() => {
    getters = {
      cachedProtocolLiquidClasses: () => sampleCachedProtocolLiquidClasses,
      cachedProtocolPipettes: () => sampleCachedProtocolPipettes,
      cachedProtocolSequences: () => sampleCachedProtocolSequences,
      cachedProtocolSteps: () => sampleCachedProtocolSteps,
      nonTipRackLabwares: () => sampleNonTipRackLabwares,
    };

    store = new Vuex.Store({
      getters,
    });

    wrapper = shallowMount(SequenceTransferConfigForm, {
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
