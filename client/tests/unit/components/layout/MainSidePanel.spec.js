import { shallowMount } from "@vue/test-utils"
import MainSidePanel from "@/components/layout/MainSidePanel"


describe("shallowMounted MainSidePanel", () => {
    const wrapper = shallowMount(MainSidePanel)

    it("renders correctly", () => {
        expect(wrapper.element).toMatchSnapshot();
    })
})
