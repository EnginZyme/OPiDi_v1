import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import LabwareSelectForm from "@/components/forms/LabwareSelectForm";

const localVue = createLocalVue();

localVue.use(Vuex);

const sampleIndex = 9;
const sampleTipRacks = [
  {
    labware_name: "Opentrons 96 Tip Rack 10 µL",
    labware_id: "ot_96_tiprack_10ul",
    labware_type: "tipRack",
  },
  {
    labware_name: "Opentrons 96 Tip Rack 0.3 mL",
    labware_id: "ot_96_tiprack_300ul",
    labware_type: "tipRack",
  },
  {
    labware_name: "Opentrons 96 Filter Tip Rack 20 µL",
    labware_id: "ot_96_tiprack_20ul",
    labware_type: "tipRack",
  },
];
const sampleTubeRacks = [
  {
    labware_name: "test tuberack 65 mL tubes",
    labware_id: "test_tuberack_65_mL_tubes",
    labware_type: "tubeRack",
  },
  {
    labware_name: "Test Tube Rack 5 mL",
    labware_id: "test_tuberack_5mL",
    labware_type: "tubeRack",
  },
  {
    labware_name: "Test Tube Rack 1.5mL",
    labware_id: "test_tuberack_1.5mL",
    labware_type: "tubeRack",
  },
  {
    labware_name: "Test Tube Rack 2mL",
    labware_id: "test_tube_rack_2mL",
    labware_type: "tubeRack",
  },
  {
    labware_name: "Test Tube Rack 50 mL",
    labware_id: "test_tuberack_50mL",
    labware_type: "tubeRack",
  },
  {
    labware_name: "test foo bar",
    labware_id: "test_foo_bar",
    labware_type: "tubeRack",
  },
  {
    labware_name: "test bar baz",
    labware_id: "test_bar_baz",
    labware_type: "tubeRack",
  },
  {
    labware_name: "test bar baz 2",
    labware_id: "test_bar_baz_2",
    labware_type: "tubeRack",
  },
  {
    labware_name: "test bar baz 3",
    labware_id: "test_bar_baz_3",
    labware_type: "tubeRack",
  },
];
const sampleWellPlates = [
  {
    labware_name: "test 96 well-plate 0.3 mL",
    labware_id: "test_96__wellplate_0.3ml",
    labware_type: "wellPlate",
  },
  {
    labware_name: "testt 96 well-plate 0.3mL",
    labware_id: "testt_96__wellplate_0.3ml",
    labware_type: "wellPlate",
  },
  {
    labware_name: "tets 96 wellplate 0.5ml",
    labware_id: "tets_96_wellplate_0.5ml",
    labware_type: "wellPlate",
  },
  {
    labware_name: "test 96 wellplates 0.5mL",
    labware_id: "test_96_wellplates__0.5ml",
    labware_type: "wellPlate",
  },
  {
    labware_name: "tesst 96 well-plate 2ml",
    labware_id: "tesst_96_wellplate_2.0ml",
    labware_type: "wellPlate",
  },
  {
    labware_name: "test 96 well-plate 4mL",
    labware_id: "test_96_wellplate__4.0ml",
    labware_type: "wellPlate",
  },
];
const sampleReservoirs = [
  {
    labware_name: "test 1xslot 2mL",
    labware_id: "test_1xslot_2ml",
    labware_type: "reservoir",
  },
  {
    labware_name: "test slot 3 mL",
    labware_id: "test_slot_3_mL",
    labware_type: "reservoir",
  },
  {
    labware_name: "test 4xslot 5mL",
    labware_id: "test_4xslot_5ml",
    labware_type: "reservoir",
  },
  {
    labware_name: "test 12xslot 6mL",
    labware_id: "test_12xslot_6ml",
    labware_type: "reservoir",
  },
];
const sampleShakerLabwares = [
  {
    labware_name: "2.0ml Eppendorfs on Al-rack on 3xT",
    labware_id: "2.0ml_eppendorfs_on_al_rack_on_3xt",
    labware_type: "shakerLabware",
  },
  {
    labware_name: "2 Tube Rack 2 mL on 3xT",
    labware_id: "2_tuberack_2ml_on_3xt",
    labware_type: "shakerLabware",
  },
  {
    labware_name: "test 96 wellplate 0.3ml 3xT",
    labware_id: "test_96_wellplate_0.3ml__3xt",
    labware_type: "shakerLabware",
  },
  {
    labware_name: "test 9 wellplate 1.5mL 3xT",
    labware_id: "tst_96__tube__3xt",
    labware_type: "shakerLabware",
  },
  {
    labware_name: "test 96 wellplate 2ml 3xT",
    labware_id: "test_96_wellplate_2ml_3xT",
    labware_type: "shakerLabware",
  },
];

describe("shallowMounted LabwareSelectForm", () => {
  let getters;
  let store;
  let wrapper;

  beforeEach(() => {
    getters = {
      tipRacks: () => sampleTipRacks,
      tubeRacks: () => sampleTubeRacks,
      wellPlates: () => sampleWellPlates,
      reservoirs: () => sampleReservoirs,
      shakerLabwares: () => sampleShakerLabwares,
    };

    store = new Vuex.Store({
      getters,
    });

    wrapper = shallowMount(LabwareSelectForm, {
      store,
      localVue,
      propsData: {
        index: sampleIndex,
        shouldDisplayModal: true,
      },
    });
  });

  it("renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
