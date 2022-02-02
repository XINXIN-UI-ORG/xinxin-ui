import { defineComponent } from "vue";
import style from "../../../theme-chalk/XInput.module.styl";

const XInput = defineComponent({
    name: "x-input",
    inheritAttrs: false,
    props: {
        mode: {
            type: String,
            default: "normal",
        },
        modelValue: {
            type: String,
            default: "",
        },
    },
    setup(props, { emit, attrs }) {
        const inputEvent = (e: Event) => {
            const inputDom = e.target as HTMLInputElement;
            // 获取value值更新到外面
            emit("update:modelValue", inputDom.value);
        };
        return () => (
            <div class={[style["x-input"], style["x-input-" + props.mode]]}>
                <input
                    type={attrs.type as string}
                    class={style["x-input__input"]}
                    placeholder={attrs.placeholder as string}
                    autocomplete="false"
                    size={(attrs.size as string) ?? 20}
                    onInput={inputEvent}
                />
                <div class={style["x-input__border"]}></div>
            </div>
        );
    },
});

export default XInput;
