import { shallowMount } from "@vue/test-utils"
import ProtocolEditorTopNavBar from "@/components/layout/ProtocolEditorTopNavBar"


describe("shallowMounted ProtocolEditorTopNavBar", () => {
    const wrapper = shallowMount(ProtocolEditorTopNavBar)

    it("renders correctly", () => {
        expect(wrapper.element).toMatchSnapshot();
    })
})
