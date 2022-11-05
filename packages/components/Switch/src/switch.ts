import type { PropType, ExtractPropTypes, SetupContext, Ref, CSSProperties } from "vue";
import { NormalSize, ModelValueTypeVue, ModelValueType } from "@xinxin-ui/typings";
import { computed, ref, onMounted, inject } from "vue";
import { MODEL_VALUE_UPDATE } from "@xinxin-ui/constants";
import { isBoolean, isNumber, isString } from "@vueuse/core";
import { FormItemKey } from "@xinxin-ui/symbols";

export const switchProps = {
    size: {
        type: String as PropType<NormalSize>,
        default: "normal"
    },
    modelValue: {
        type: ModelValueTypeVue,
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
    loading: {
        type: Boolean,
        default: false,
    },
    beforeChange: {
        type: Function as PropType<() => boolean | Promise<boolean>>,
        default: () => true,
    },
    activeValue: {
        type: ModelValueTypeVue,
        default: true,
    },
    inactiveValue: {
        type: ModelValueTypeVue,
        default: false,
    },
};

export const switchEmits = {
    [MODEL_VALUE_UPDATE]: (value: ModelValueType) => isBoolean(value) || isString(value) || isNumber(value),
    changeValue: (value: ModelValueType) => isBoolean(value) || isString(value) || isNumber(value),
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
    let animateTime = ref<string>("0");
    let offset = 6;

    onMounted(() => {
        const observe = new ResizeObserver(() => {
            displayWidth.value = Math.max(10, activeRef.value?.clientWidth || 0, inactiveRef.value?.clientWidth || 0) + offset;
            activePadding.value = Math.abs(displayWidth.value - (activeRef.value?.clientWidth || 0));
            inactivePadding.value = Math.abs(displayWidth.value - (inactiveRef.value?.clientWidth || 0));
            setTimeout(() => {
                animateTime.value = '.3s';
            }, 200);
        });
        observe.observe(activeRef.value!);
        observe.observe(inactiveRef.value!);
    });

    const formItem = inject(FormItemKey, {
        size: props.size,
    });

    return {
        modelValue: computed<boolean>({
            get() {
                return props.modelValue === props.activeValue;
            },
            set(value) {
                // 根据选中的boolean值获取用户激活或未激活的值进行设置
                const convertValue = value ? props.activeValue : props.inactiveValue;
                const status = props.beforeChange();
                if (typeof status === 'boolean' && status) {
                    emit(MODEL_VALUE_UPDATE, convertValue);
                    emit("changeValue", convertValue);
                    return;
                }
                if (status instanceof Promise) {
                    status.then(() => {
                        emit(MODEL_VALUE_UPDATE, convertValue);
                        emit("changeValue", convertValue);
                    });
                }
            }
        }),
        displayStyle: computed(() => ({
            "--display-width": `${displayWidth.value}px`,
            "--in-display-width": `-${displayWidth.value}px`,
            "--offset": `${offset}px`,
            "--active-color": props.activeColor,
            "--inactive-color": props.inactiveColor,
            "--time": animateTime.value,
        })),
        activeStyle: computed<CSSProperties>(() => ({
            "margin-left": `${activePadding.value}px`,
        })),
        inactiveStyle: computed<CSSProperties>(() => ({
            "margin-right": `${inactivePadding.value}px`,
        })),
        formItem,
    };
}