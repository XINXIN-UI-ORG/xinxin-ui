import { mount } from "@vue/test-utils";
import XRadio from "../src/XRadio.vue";

let xMount = (template: string, data?: any) => mount({
    template,
    data,
    components: {
        "x-radio": XRadio,
    },
});

describe('Radio', () => {
    test("create", async () => {
        let wrapper = xMount(`
            <x-radio v-model="radio" value="1">单选</x-radio>
        `,
        () => ({
            radio: ''
        }));
        expect(wrapper.classes()).toContain("x-radio");
        let input = wrapper.find("input");
        await input.trigger('change');
        expect(wrapper.html()).toContain("x-radio__icon__checked");
    });
});
