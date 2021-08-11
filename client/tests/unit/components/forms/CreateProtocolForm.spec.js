import { shallowMount } from "@vue/test-utils";
import CreateProtocolForm from "@/components/forms/CreateProtocolForm";

describe("UnshallowMounted CreateProtocolForm", () => {
  it("has data", () => {
    expect(typeof CreateProtocolForm.data).toBe("function");
  });
});

describe("shallowMounted CreateProtocolForm", () => {
  const wrapper = shallowMount(CreateProtocolForm);

  it("renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
