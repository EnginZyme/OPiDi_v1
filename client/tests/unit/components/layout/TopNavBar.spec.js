import { shallowMount } from "@vue/test-utils"
import TopNavBar from "@/components/layout/TopNavBar"


describe("shallowMounted TopNavBar", () => {
    const wrapper = shallowMount(TopNavBar)

    it("renders correctly", () => {
        expect(wrapper.element).toMatchSnapshot();
    })
})
