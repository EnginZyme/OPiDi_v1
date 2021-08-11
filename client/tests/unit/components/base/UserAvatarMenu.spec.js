import { shallowMount } from "@vue/test-utils";
import UserAvatarMenu from "@/components/base/UserAvatarMenu";

describe("shallowMounted UserAvatarMenu", () => {
  const wrapper = shallowMount(UserAvatarMenu);

  it("renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
