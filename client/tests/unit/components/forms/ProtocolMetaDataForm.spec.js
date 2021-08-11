import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import ProtocolMetaDataForm from "@/components/forms/ProtocolMetaDataForm";

const localVue = createLocalVue();

localVue.use(Vuex);

const sampleCachedProtocol = {
  id: 168,
  protocol: {
    dependencies: [],
    metadata: {
      name: "Functionality test protocol",
      description: "test for OPD 2.1.0",
      author: { name: "Foo Bar", email: "foo@acme.com" },
      is_verified: false,
      is_shared: true,
      created: 1613569949644,
    },
    hasChanged: false,
    deck: {},
    steps: [],
    liquid_classes: [],
    sequences: [],
    stepCounter: 0,
    sequenceCounter: 0,
    liquidClassCounter: 0,
  },
};
const sampleCachedProtocolAuthor = "Foo Bar";
const sampleCachedProtocolCreated = "Wed Feb 17 2021";
const sampleCachedProtocolDescription = "test for OPD 2.1.0";
const sampleCachedProtocolIsShared = true;
const sampleCachedProtocolIsVerified = false;
const sampleCachedProtocolName = "Functionality test protocol";
const sampleUserEmail = "bar@acme.com";

describe("shallowMounted ProtocolMetaDataForm", () => {
  let getters;
  let store;
  let wrapper;

  beforeEach(() => {
    getters = {
      cachedProtocol: () => sampleCachedProtocol,
      cachedProtocolAuthor: () => sampleCachedProtocolAuthor,
      cachedProtocolCreated: () => sampleCachedProtocolCreated,
      cachedProtocolDescription: () => sampleCachedProtocolDescription,
      cachedProtocolIsShared: () => sampleCachedProtocolIsShared,
      cachedProtocolIsVerified: () => sampleCachedProtocolIsVerified,
      cachedProtocolName: () => sampleCachedProtocolName,
      userEmail: () => sampleUserEmail,
    };

    store = new Vuex.Store({
      getters,
    });

    wrapper = shallowMount(ProtocolMetaDataForm, {
      store,
      localVue,
    });
  });

  it("renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
