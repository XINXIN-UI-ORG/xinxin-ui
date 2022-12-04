import type { DirectiveBinding } from 'vue';
import type { CustomerDirective } from './index';

const clickHidden: CustomerDirective<HTMLElement, string> = {
    name: 'click-hidden',
    mounted(el: HTMLElement, binding: DirectiveBinding) {
        console.log(el, binding.value, binding);
    },
};

export default clickHidden;