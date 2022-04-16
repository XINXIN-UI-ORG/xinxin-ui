import type { Ref } from "vue";
import { defineComponent, inject, onMounted, ref, unref, watchEffect } from "vue";
import { ReferenceInjectKey } from "@xinxin-ui/symbols";
import { PopoverPropsType, popoverProps } from "./popover.ts";
import { usePopper } from "@xinxin-ui/utils";
import arrowStyle from "../style/arrow.module.styl";

const PopoverArrow = defineComponent({
    props: popoverProps,
    setup(props) {
        let popoverArrowRef = ref<HTMLDivElement | null>(null);
        usePopoverArrow(popoverArrowRef, props);
        return () => (
            <div
                ref={popoverArrowRef}
                class={arrowStyle['x-popover__arrow']}
            >
                <div
                    class={[
                        arrowStyle['x-popover__arrow__triangle'],
                        arrowStyle[`x-popover__arrow__triangle-${props.placement?.split("-")[0]}`]
                    ]}
                ></div>
            </div>
        );
    }
});

function usePopoverArrow(popoverArrowRef: Ref<HTMLDivElement | null>, props: PopoverPropsType): void {
    const { triggerRef } = inject(ReferenceInjectKey, undefined)!;
    onMounted(() => {
        watchEffect(() => {
            usePopper(unref(triggerRef)!, unref(popoverArrowRef)!, {
                placement: props.placement?.split("-")[0],
                offset: props.offset - 5,
            });
        });
    });
}

export default PopoverArrow;