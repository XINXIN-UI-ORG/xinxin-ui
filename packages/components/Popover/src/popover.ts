import { PlacementType } from "@xinxin-ui/typings";
import type { ExtractPropTypes, PropType, Ref } from "vue";
import { onMounted, provide, ref, unref, watchEffect } from "vue";
import { usePopper } from "@xinxin-ui/utils";
import { ReferenceGather, ReferenceInjectKey } from "@xinxin-ui/symbols";

export const popoverProps = {
    content: {
        type: String,
        default: "xinxin-ui",
    },
    placement: {
        type: String as PropType<PlacementType>,
        default: "top",
    },
    theme: {
        type: String,
        default: "light"
    },
    offset: {
        type: Number,
        default: 12,
    },
    boundary: {
        type: Object as PropType<HTMLElement | Document>,
        default: document
    },
};

export type PopoverPropsType = ExtractPropTypes<typeof popoverProps>;

export function usePopover(
    popoverContentRef: Ref<HTMLDivElement | null>,
    popoverArrow: Ref<HTMLDivElement | null>,
    props: PopoverPropsType,
): void {
    // 注册reference
    let popoverRefGather: ReferenceGather = {
        triggerRef: ref<HTMLElement | null>(null),
    };
    provide(ReferenceInjectKey, popoverRefGather);
    // 定位popper
    onMounted(() => {
        watchEffect(() => {
            if (!unref(popoverContentRef)) {
                return;
            }
            usePopper(unref(popoverRefGather.triggerRef)!, unref(popoverContentRef) as HTMLElement, {
                placement: props.placement,
                offset: props.offset,
                boundary: props.boundary,
                arrowDom: unref(popoverArrow)!,
            });
        });
    })
}

