import { shallowMount } from "@vue/test-utils"
import ProtocolSidePanel from "@/components/layout/ProtocolSidePanel"


describe("shallowMounted ProtocolSidePanel", () => {
    const wrapper = shallowMount(ProtocolSidePanel)

    it("renders correctly", () => {
        expect(wrapper.element).toMatchSnapshot();
    })
})
