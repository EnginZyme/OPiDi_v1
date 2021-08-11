import { shallowMount } from "@vue/test-utils";
import AppBanner from "@/components/base/AppBanner";

describe("UnshallowMounted AppBanner", () => {
  it("has data", () => {
    expect(typeof AppBanner.data).toBe("function");
  });
});

describe("shallowMounted AppBanner", () => {
  const wrapper = shallowMount(AppBanner);

  it("has an image", () => {
    expect(wrapper.find("img").exists()).toBe(true);
  });

  it("renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});

describe("shallowMounted AppBanner with 'showImage' prop set as false", () => {
  const wrapper = shallowMount(AppBanner, {
    propsData: {
      showImage: false,
    },
  });

  it("has no logo image", () => {
    expect(wrapper.find("img").exists()).toBe(false);
  });

  it("renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});

describe("shallowMounted AppBanner with 'dark' prop set as true", () => {
  const wrapper = shallowMount(AppBanner, {
    propsData: {
      dark: true,
    },
  });

  it("renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});

describe("shallowMounted AppBanner with 'version' property set to a random value", () => {
  const wrapper = shallowMount(AppBanner);

  const major = Math.floor(Math.random() * 100);
  const minor = Math.floor(Math.random() * 100);
  const patch = Math.floor(Math.random() * 100);
  const randomVersionValue = `${major}.${minor}.${patch}`;

  wrapper.setData({
    version: randomVersionValue,
  });

  it("has the random version value in the rendered text", () => {
    expect(wrapper.text()).toContain(randomVersionValue);
  });
});
