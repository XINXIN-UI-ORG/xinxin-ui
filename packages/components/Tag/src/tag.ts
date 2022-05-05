import { computed, ref } from "vue";
import type { PropType, ExtractPropTypes, SetupContext } from "vue";
import type { NormalType, NormalSize } from "@xinxin-ui/typings";
import { isBoolean } from "@vueuse/core";

type ThemeType = "plain" | "ghost" | "fill";

export const tagProps = {
    type: {
        type: String as PropType<NormalType>,
        default: "default"
    },
    size: {
        type: String as PropType<NormalSize>,
        default: 'normal'
    },
    theme: {
        type: String as PropType<ThemeType>,
        default: "plain",
    },
    closeable: {
        type: Boolean,
        default: false,
    },
    visible: {
        type: Boolean,
        default: true,
    },
    round: {
        type: Boolean,
        default: false,
    },
    autoClose: {
        type: Boolean,
        default: true,
    },
};

export type TagProps = ExtractPropTypes<typeof tagProps>;

export const tagEmits = {
    close: null,
    "update:visible": (value: boolean) => isBoolean(value),
};

export function useTag(
    props: TagProps,
    emit: SetupContext<typeof tagEmits>['emit'],
) {
    let autoVisible = ref<boolean>(true);

    return {
        autoVisible,
        tagDisappear(e: Event) {
            let closeable = props.autoClose;
            emit('close', e);
            if (closeable) {
                emit("update:visible", false);
                autoVisible.value = false;
            }
        },
    };
}