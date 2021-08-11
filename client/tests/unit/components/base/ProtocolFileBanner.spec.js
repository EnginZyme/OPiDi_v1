import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import ProtocolFileBanner from "@/components/base/ProtocolFileBanner";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("shallowMounted ProtocolFileBanner", () => {
  let getters;
  let store;
  let wrapper;

  const sampleProtocolName = "sample-protocol-name";
  const sampleProtocolAuthorName = "sample-protocol-author-name";

  beforeEach(() => {
    getters = {
      cachedProtocolName: () => sampleProtocolName,
      cachedProtocolAuthor: () => sampleProtocolAuthorName,
    };

    store = new Vuex.Store({
      getters,
    });

    wrapper = shallowMount(ProtocolFileBanner, {
      store,
      localVue,
    });
  });

  it("contains sample protocol name", () => {
    expect(wrapper.text()).toContain(sampleProtocolName);
  });

  it("contains the sample protocol author name", () => {
    expect(wrapper.text()).toContain(sampleProtocolAuthorName);
  });

  it("renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
