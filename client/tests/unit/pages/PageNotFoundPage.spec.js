import { shallowMount } from "@vue/test-utils"
import PageNotFoundPage from "@/pages/PageNotFoundPage"


describe("shallowMounted PageNotFoundPage", () => {
    const wrapper = shallowMount(PageNotFoundPage)

    it("renders correctly", () => {
        expect(wrapper.element).toMatchSnapshot();
    })
})
