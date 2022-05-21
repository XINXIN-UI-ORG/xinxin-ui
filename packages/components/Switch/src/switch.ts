import type { PropType, ExtractPropTypes, SetupContext, Ref, CSSProperties } from "vue";
import type { NormalSize } from "@xinxin-ui/typings";
import { computed, ref, onMounted } from "vue";
import { MODEL_VALUE_UPDATE } from "@xinxin-ui/constants";
import { isBoolean } from "@vueuse/core";
import { offset } from "@popperjs/core";

export const switchProps = {
    size: {
        type: String as PropType<NormalSize>,
        default: "normal"
    },
    modelValue: {
        type: Boolean,
        default: false,
    },
    activeColor: {
        type: String,
        default: "#f5a31f",
    },
    inactiveColor: {
        type: String,
        default: "#dcdfe6"
    },
    activeText: {
        type: String,
        default: '',
    },
    inactiveText: {
        type: String,
        default: '',
    },
    disabled: {
        type: Boolean,
        default: false,
    },
};

export const switchEmits = {
    [MODEL_VALUE_UPDATE]: (value: boolean) => isBoolean(value),
};

export type SwitchProps = ExtractPropTypes<typeof switchProps>;

export function useSwitch(
    props: SwitchProps,
    emit: SetupContext<typeof switchEmits>['emit'],
    activeRef: Ref<HTMLDivElement | undefined>,
    inactiveRef: Ref<HTMLDivElement | undefined>,
) {
    let displayWidth = ref<number>(0);
    let activePadding = ref<number>(0);
    let inactivePadding = ref<number>(0);
    let offset = 6;

    onMounted(() => {
        const observe = new ResizeObserver(() => {
            displayWidth.value = Math.max(10, activeRef.value!.clientWidth, inactiveRef.value!.clientWidth) + offset;
            activePadding.value = Math.abs(displayWidth.value - activeRef.value!.clientWidth);
            inactivePadding.value = Math.abs(displayWidth.value - inactiveRef.value!.clientWidth);
        });
        observe.observe(activeRef.value!);
        observe.observe(inactiveRef.value!);
    });

    return {
        modelValue: computed<boolean>({
            get() {
                return props.modelValue;
            },
            set(value) {
                emit(MODEL_VALUE_UPDATE, value);
            }
        }),
        displayStyle: computed(() => ({
            "--display-width": `${displayWidth.value}px`,
            "--in-display-width": `-${displayWidth.value}px`,
            "--offset": `${offset}px`,
            "--active-color": props.activeColor,
            "--inactive-color": props.inactiveColor,
        })),
        activeStyle: computed<CSSProperties>(() => ({
            "margin-left": `${activePadding.value}px`,
        })),
        inactiveStyle: computed<CSSProperties>(() => ({
            "margin-right": `${inactivePadding.value}px`,
        })),
    };
}