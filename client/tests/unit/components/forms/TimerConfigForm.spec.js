import { shallowMount } from "@vue/test-utils";
import TimerConfigForm from "@/components/forms/TimerConfigForm"

const sampleFormType = "timer";
const sampleStepID = -1;

describe("shallowMounted TimerConfigForm", () => {
    const wrapper = shallowMount(TimerConfigForm, {
      propsData: {
        formType: sampleFormType,
        stepID: sampleStepID,
      },
    });

    it("renders correctly", () => {
        expect(wrapper.element).toMatchSnapshot();
    })
})
