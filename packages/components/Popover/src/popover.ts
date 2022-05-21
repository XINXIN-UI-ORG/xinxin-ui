import { PlacementType } from "@xinxin-ui/typings";
import type { ExtractPropTypes, PropType, Ref, SetupContext } from "vue";
import { onMounted, provide, ref, unref, watch, computed } from "vue";
import { usePopper } from "@xinxin-ui/utils";
import { ReferenceGather, ReferenceInjectKey } from "@xinxin-ui/symbols";
import { ScrollPosition } from "../../Scrollbar/src/scrollbar";

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
    style: Object,
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

export const popoverEmits = {
    popoverScroll: null,
};

export function usePopover(
    popoverContentRef: Ref<HTMLDivElement | null>,
    popoverArrow: Ref<HTMLDivElement | null>,
    props: PopoverPropsType,
    expose: (exposed?: Record<string, any>) => void,
    emit: SetupContext<typeof popoverEmits>['emit'],
) {
    // 计算父级dom宽度
    let fatherWidth = ref<number>(0);

    // 注册reference
    let popoverRefGather: ReferenceGather = {
        triggerRef: ref<HTMLElement | null>(null),
        popperRef: popoverContentRef,
    };
    let popperInstance: any;
    provide(ReferenceInjectKey, popoverRefGather);
    // 定位popper
    onMounted(() => {
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

        // 获取父级元素宽度
        fatherWidth.value = popoverRefGather.triggerRef.value!.offsetWidth;
    });

    // 导出组件
    expose({
        update() {
            popperInstance && popperInstance.update();
        },
        updatePopoverWidth() {
            fatherWidth.value = popoverRefGather.triggerRef.value!.offsetWidth;
        },
    });
    return {
        popperStyle: computed(() => ({
            ...props.style,
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
                        ? fatherWidth.value + props._extendWidth + 'px'
                        : 'auto',
        })),
        popoverScroll(scrollPosition: ScrollPosition) {
            emit("popoverScroll", scrollPosition);
        }
    };
}

