import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import UserAvatarImage from "@/components/base/UserAvatarImage";

const localVue = createLocalVue();

localVue.use(Vuex);

const sampleImageSrc = "../../assets/logo_dark.svg";

describe("shallowMounted UserAvatarImage", () => {
  let getters;
  let store;
  let wrapper;

  beforeEach(() => {
    getters = {
      userImageURL: () => sampleImageSrc,
    };

    store = new Vuex.Store({
      getters,
    });

    wrapper = shallowMount(UserAvatarImage, {
      store,
      localVue,
    });
  });

  it("renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});

describe("shallowMounted UserAvatarImage with 'size' prop set to large", () => {
  let getters;
  let store;
  let wrapper;

  beforeEach(() => {
    getters = {
      userImageURL: () => sampleImageSrc,
    };

    store = new Vuex.Store({
      getters,
    });

    wrapper = shallowMount(UserAvatarImage, {
      store,
      localVue,
      propsData: {
        large: true,
      },
    });
  });

  it("renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
