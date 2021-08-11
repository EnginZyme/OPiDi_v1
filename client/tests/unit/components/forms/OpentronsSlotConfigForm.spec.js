import { shallowMount } from "@vue/test-utils";
import OpentronsSlotConfigForm from "@/components/forms/OpentronsSlotConfigForm";

describe("shallowMounted OpentronsSlotConfigForm", () => {
  const wrapper = shallowMount(OpentronsSlotConfigForm);

  it("renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
