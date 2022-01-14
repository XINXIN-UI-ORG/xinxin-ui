<script lang="ts">
import { defineComponent, PropType } from "vue";
import type { ButtonType, ButtonSize } from "./XButton.types";

export default defineComponent({
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
    setup() {
        return {
            testColor: "#f00"
        };
    },
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
</script>
<template>
    <button class="x-button">
        <slot>XINXIN-UI</slot>
    </button>
</template>
<style lang="stylus" scoped>
.x-button
    cursor pointer
    line-height 1
    background-color v-bind(bgColor)
    border 1px solid v-bind(borderColor)
    color v-bind(textColor)
    border-radius v-bind(borderRadius)
    padding 0 v-bind(buttonPadding)
    height v-bind(buttonHeight)
    font-size v-bind(buttonFont)
</style>
