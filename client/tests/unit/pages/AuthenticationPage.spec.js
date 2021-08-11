import { shallowMount } from "@vue/test-utils"
import AuthenticationPage from "@/pages/AuthenticationPage"


describe("shallowMounted AuthenticationPage", () => {
    const wrapper = shallowMount(AuthenticationPage)

    it("renders correctly", () => {
        expect(wrapper.element).toMatchSnapshot();
    })
})
