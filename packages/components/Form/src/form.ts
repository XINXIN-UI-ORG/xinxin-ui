import { provide, reactive, computed, ref, toRefs } from "vue";
import type { Ref, ExtractPropTypes, PropType } from "vue";
import { FormKey, FormItemContext } from "@xinxin-ui/symbols";
import { NormalSize, ValidateCallback, FormRules } from "@xinxin-ui/typings";
import { Log } from "@xinxin-ui/utils";

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
  model: Object,
};

export type FormProps = ExtractPropTypes<typeof formProps>;

export function useForm(props: FormProps) {
  const formItems: FormItemContext[] = [];

  const addFormItem = (formItem: FormItemContext) => {
    if (!formItem) {
      return;
    }

    formItems.push(formItem);
  };

  // 所有formItem的验证
  const validate = (callback?: ValidateCallback) => {
    if (!props.model) {
      Log.error('无法进行验证，model选项必须填写');
      return;
    }

    let promise: Promise<boolean> | undefined;
    if (typeof callback !== 'function') {
      promise = new Promise<boolean>((resolve, reject) => {
        callback = function (isValid, invalidFields) {
          if (isValid) {
            resolve(true);
          } else {
            reject(invalidFields);
          }
        };
      });
    }

    // 开始验证每个字段
    if (formItems.length === 0) {
      callback!(true);
      return;
    }

    let invalidFields = {};
    let count = 0;
    let valid = true;
    for (const formItem of formItems) {
      formItem.validate?.(null, (errorMsg, invalidField) => {
        if (errorMsg) {
          // 当前字段验证报错
          valid = false;
        }

        invalidFields = { ...invalidFields, ...invalidField };
        // 所有字段验证完成后执行验证回调
        if (++count === formItems.length) {
          callback!(valid, invalidFields);
        }
      });
    }

    return promise;
  };

  const formRef = reactive({
    ...formLabelWidth(),
    ...formLabel(),
    ...toRefs(props),
    addFormItem,
  });

  provide(FormKey, formRef);

  return {
    validate,
  };
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
