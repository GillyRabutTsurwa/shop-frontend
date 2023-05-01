import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import Header from "../Header.vue";

describe("Header", () => {
    it("renders properly", () => {
        // const wrapper = mount(HelloWorld, { props: { msg: 'Hello Vitest' } })
        const wrapper = mount(Header);
        expect(wrapper.text()).toContain("furniture collection");
    });
});
