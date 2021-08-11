import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import DeckSetupView from "@/components/views/DeckSetupView";

const localVue = createLocalVue();

localVue.use(Vuex);

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
const sampleChosenTipRacks = [
  {
    name: "tiprack_7",
    labware_name: "Opentrons 96 Tip Rack 0.3 mL",
    labware_type: "tipRack",
    labware_id: "opentrons_96_tiprack_300ul",
    nickname: "",
    display_name: "Opentrons 96 Tip Rack 0.3 mL [7]",
    id: 7,
  },
  {
    name: "tiprack_8",
    labware_name: "Opentrons 96 Tip Rack 0.3 mL",
    labware_type: "tipRack",
    labware_id: "opentrons_96_tiprack_300ul",
    nickname: "",
    display_name: "Opentrons 96 Tip Rack 0.3 mL [8]",
    id: 8,
  },
];
const samplePipettes = [
  { name: "8 Channel 50 uL - Gen 1", id: "p50_multi", is_multichannel: true },
  { name: "8 Channel 300 uL - Gen 1", id: "p300_multi", is_multichannel: true },
  {
    name: "8 Channel 20 uL - Gen 2",
    id: "p20_multi_gen2",
    is_multichannel: true,
  },
  {
    name: "8 Channel 300 uL - Gen 2",
    id: "p300_multi_gen2",
    is_multichannel: true,
  },
  {
    name: "Single Channel 300 uL - Gen 1",
    id: "p300_single",
    is_multichannel: false,
  },
  {
    name: "Single Channel 50 uL - Gen 1",
    id: "p50_single",
    is_multichannel: false,
  },
];

describe("shallowMounted DeckSetupView", () => {
  let getters;
  let store;
  let wrapper;

  beforeEach(() => {
    getters = {
      cachedProtocolDeck: () => sampleCachedProtocolDeck,
      chosenTipRacks: () => sampleChosenTipRacks,
      pipettes: () => samplePipettes,
    };

    store = new Vuex.Store({
      getters,
    });

    wrapper = shallowMount(DeckSetupView, {
      store,
      localVue,
    });
  });

  it("renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
