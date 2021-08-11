import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import LiquidClassConfigForm from "@/components/forms/LiquidClassConfigForm";

const localVue = createLocalVue();

localVue.use(Vuex);

const sampleLcIdx = 0;
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

describe("shallowMounted LiquidClassConfigForm", () => {
  let getters;
  let store;
  let wrapper;

  beforeEach(() => {
    getters = {
      cachedProtocolLiquidClasses: () => sampleCachedProtocolLiquidClasses,
    };

    store = new Vuex.Store({
      getters,
    });

    wrapper = shallowMount(LiquidClassConfigForm, {
      store,
      localVue,
      propsData: {
        lcIdx: sampleLcIdx,
      },
    });
  });

  it("renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
