import { PlacementType } from "@xinxin-ui/typings";
import type { ExtractPropTypes, PropType, Ref } from "vue";
import { onMounted, provide, ref, unref, watch, computed } from "vue";
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
    show: {
        type: Boolean,
        default: undefined,
    },
    trigger: {
        type: String as PropType<"click" | "hover">,
        default: 'click',
    },
    showArrow: {
        type: Boolean,
        default: true,
    },
    ignoreContent: {
        type: Boolean,
        default: false,
    },
    title: {
        type: String,
        default: undefined
    },
    maxHeight: {
        type: [Number, String],
        default: undefined,
    },
    // inner props
    _block: {
        type: Boolean,
        default: false,
    },
    _extendWidth: {
        type: Number,
        default: 0,
    },
};

export type PopoverPropsType = ExtractPropTypes<typeof popoverProps>;

export function usePopover(
    popoverContentRef: Ref<HTMLDivElement | null>,
    popoverArrow: Ref<HTMLDivElement | null>,
    props: PopoverPropsType,
) {
    // 注册reference
    let popoverRefGather: ReferenceGather = {
        triggerRef: ref<HTMLElement | null>(null),
        popperRef: popoverContentRef,
    };
    provide(ReferenceInjectKey, popoverRefGather);
    // 定位popper
    onMounted(() => {
        let popperInstance: any;
        watch(
            () => popoverContentRef.value,
            (popoverContentRef) => {
                if (!popoverContentRef) {
                    return;
                }
                popperInstance = usePopper(unref(popoverRefGather.triggerRef)!, popoverContentRef, {
                    placement: props.placement,
                    offset: props.ignoreContent
                        ? props.showArrow
                            ? props.offset
                            : 4
                        : 0,
                    boundary: props.boundary,
                    arrowDom: unref(popoverArrow)!,
                });
            }
        );
        watch(() => props.placement, (placement) => {
            popperInstance && popperInstance.setOptions({
                placement: placement,
            });
        });
    });

    return {
        popperStyle: computed(() => ({
            "--margin": `${props.ignoreContent
                ? 0
                : props.showArrow
                    ? props.offset
                    : 4}px`,
            "--position": `${props.ignoreContent
                ? 0
                : props.showArrow
                    ? -props.offset
                    : -4}px`,
            "width": props._block
                        ? popoverRefGather.triggerRef.value!.offsetWidth + props._extendWidth + 'px'
                        : 'auto',
        })),
    };
}

