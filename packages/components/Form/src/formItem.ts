import type { ExtractPropTypes, Ref } from "vue";
import { inject, ref, watch, onMounted, nextTick } from "vue";
import { FormKey } from "@xinxin-ui/symbols";

export const formItemProps = {
    label: {
        type: String,
        default: "",
    },
};

export type FormItemProps = ExtractPropTypes<typeof formItemProps>;

enum UpdateWidthEnum {
    UPDATE,
    REMOVE,
};

export function useFormItem(
    labelRef: Ref<HTMLLabelElement>
) {
    const xForm = inject(FormKey);
    
    const computedWidth = ref<number>(0);
    watch(computedWidth, (newVal: number, oldVal: number) => {
        // 当宽度改变时更新form中保存宽度的数组
        xForm?.registerLabelWidth(newVal, oldVal);
        // 更新每个form-item的label
        xForm?.updateAllLabelWidth(xForm.autoMaxLabelWidth);
    });

    const updateLabelWidth = (type = UpdateWidthEnum.UPDATE) => {
        nextTick(() => {
            if (type === UpdateWidthEnum.UPDATE) {
                if (labelRef.value) {
                    const labelRealWidth = parseFloat(window.getComputedStyle(labelRef.value).width);
                    computedWidth.value = labelRealWidth === NaN ? 0 : labelRealWidth;
                }
            }

            if (type === UpdateWidthEnum.REMOVE) {
                // 移除当前label的宽度
            }
        });
    };

    onMounted(() => {
        updateLabelWidth(UpdateWidthEnum.UPDATE);
        xForm?.registerLabel(labelRef);
    });
}