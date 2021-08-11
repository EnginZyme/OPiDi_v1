import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import DeckSlotCard from "@/components/base/DeckSlotCard";

const localVue = createLocalVue();

localVue.use(Vuex);

const sampleSlot1 = {
  name: "wellplate_1",
  labware_name: "test 96 wellplate 2ml 3xT",
  labware_type: "shakerLabware",
  labware_id: "test_96_wellplate_2ml_3xT",
  nickname: "",
  display_name: "test 96 wellplate 2ml 3xT [1]",
  id: 1,
};
const sampleSlot2 = {
  name: "tuberack_2",
  labware_name: "test tuberack 65 mL tubes",
  labware_type: "tubeRack",
  labware_id: "test_tuberack_65_mL_tubes",
  nickname: "",
  display_name: "test tuberack 65 mL tubes [2]",
  id: 2,
};
const sampleSlot3 = {};
const sampleSlot4 = {};
const sampleSlot5 = {
  name: "reservoir_5",
  labware_name: "test slot 3 mL",
  labware_type: "reservoir",
  labware_id: "test_slot_3_mL",
  nickname: "",
  display_name: "test slot 3 mL [5]",
  id: 5,
};
const sampleSlot6 = {};
const sampleSlot7 = {
  name: "tiprack_7",
  labware_name: "Opentrons 96 Tip Rack 0.3 mL",
  labware_type: "tipRack",
  labware_id: "opentrons_96_tiprack_300ul",
  nickname: "",
  display_name: "Opentrons 96 Tip Rack 0.3 mL [7]",
  id: 7,
};
const sampleSlot8 = {
  name: "tiprack_8",
  labware_name: "Opentrons 96 Tip Rack 0.3 mL",
  labware_type: "tipRack",
  labware_id: "opentrons_96_tiprack_300ul",
  nickname: "",
  display_name: "Opentrons 96 Tip Rack 0.3 mL [8]",
  id: 8,
};
const sampleSlot9 = {};
const sampleSlot10 = {};
const sampleSlot11 = {};
const sampleSlot12 = {};

describe("UnshallowMounted DeckSlotCard", () => {
  it("has data", () => {
    expect(typeof DeckSlotCard.data).toBe("function");
  });
});

describe("shallowMounted DeckSlotCard", () => {
  let getters;
  let store;
  let wrapper;

  beforeEach(() => {
    getters = {
      slot1: () => sampleSlot1,
      slot2: () => sampleSlot2,
      slot3: () => sampleSlot3,
      slot4: () => sampleSlot4,
      slot5: () => sampleSlot5,
      slot6: () => sampleSlot6,
      slot7: () => sampleSlot7,
      slot8: () => sampleSlot8,
      slot9: () => sampleSlot9,
      slot10: () => sampleSlot10,
      slot11: () => sampleSlot11,
      slot12: () => sampleSlot12,
    };

    store = new Vuex.Store({
      getters,
    });

    wrapper = shallowMount(DeckSlotCard, {
      store,
      localVue,
      propsData: {
        index: 10,
      },
    });
  });

  it("renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
