import { defineComponent, PropType } from "vue";
import type { ButtonType, ButtonSize } from "./XButton.types";

const XButton = defineComponent({
    name: "x-button",
    props: {
        type: {
            type: String as PropType<ButtonType>,
            default: "default"
        },
        size: {
            type: String as PropType<ButtonSize>,
            default: "normal"
        },
    },
    setup(props, { slots }) {
        return () => (
            <button class="x-button" style={Object.assign(buttonTheme[props.type], buttonSize[props.size])}>
                {
                    slots.default ? slots.default() :
                    "XINXIN-UI"
                }
            </button>
        );
    }
});

// 按钮主题
const buttonTheme = {
    default: {
        "background-color": "#0000",
        "border": "1px solid #dcdfe6",
        "color": "#606266",
        "border-radius": "3px"
    },
};

const buttonSize = {
    normal: {
        padding: "0 14px",
        height: "34px",
        "font-size": "14px"
    },
};

export default XButton;
