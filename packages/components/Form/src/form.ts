import { provide, reactive, computed, ref, toRefs } from "vue";
import type { Ref, ExtractPropTypes, PropType } from "vue";
import { FormKey, FormRules } from "@xinxin-ui/symbols";
import { NormalSize } from "@xinxin-ui/typings";

type Position = "left" | "right" | "top";

export const formProps = {
    labelPosition: {
        type: String as PropType<Position>,
        default: 'left',
    },
    size: {
        type: String as PropType<NormalSize>,
        default: 'normal',
    },
    rules: {
        type: Object as PropType<FormRules>,
        default: {},
    },
};

export type FormProps = ExtractPropTypes<typeof formProps>;

export function useForm(props: FormProps) {

    const formRef = reactive({
        ...formLabelWidth(),
        ...formLabel(),
        ...toRefs(props),
        rules: props.rules,

    });

    provide(FormKey, formRef);
}


function formLabelWidth() {
    const labelWidthList = ref<Array<number>>([]);
    const autoMaxLabelWidth = computed<string>(() => {
        if (labelWidthList.value.length <= 0) {
            return '0';
        }
        return `${Math.max(...labelWidthList.value)}px`;
    });

    const getLabelWidthIndex = (width: number) => {
        return labelWidthList.value.indexOf(width);
    };

    const registerLabelWidth = (newVal: number, oldVal: number) => {
        if (newVal) {
            if (oldVal) {
                const index = getLabelWidthIndex(oldVal);
                labelWidthList.value.splice(index, 1, newVal);
            } else {
                labelWidthList.value.push(newVal);
            }
        }
    };
    
    const cancellationLabelWidth = (val: number) => {
        const index = getLabelWidthIndex(val);
        index > -1 && labelWidthList.value.splice(index, 1);
    };

    return {
        autoMaxLabelWidth,
        registerLabelWidth,
        cancellationLabelWidth,
    };
}

function formLabel() {
    const labelList = ref<Array<Ref<HTMLLabelElement>>>([]);

    const registerLabel = (labelRef: Ref<HTMLLabelElement>) => {
        labelList.value.push(labelRef);
    };

    const cancellationLabel = (labelRef: Ref<HTMLLabelElement>) => {
        const index = labelList.value.indexOf(labelRef);
        index > -1 && labelList.value.splice(index, 1);
    };

    const updateAllLabelWidth = (width: string) => {
        labelList.value.forEach(label => {
            label.value.style.width = width;
        });
    };

    return {
        registerLabel,
        cancellationLabel,
        updateAllLabelWidth,
    };
}
