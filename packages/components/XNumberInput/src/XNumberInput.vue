<script lang="ts">
import { computed, defineComponent, Ref, ref } from "vue";
import XInput from "../../XInput";
import { Up } from "xinxin-icons";

export default defineComponent({
    name: "x-number-input",
    inheritAttrs: false,
    props: {
        numberButton: {
            type: Boolean,
            default: false,
        },
        step: {
            type: [String, Number],
            default: 1,
        },
        min: Number,
        max: Number,
    },
    setup(props, { attrs }) {
        let xInputRef = ref();
        let upBtnRef = ref<HTMLDivElement>();
        let downBtnRef = ref<HTMLDivElement>();
        let { upValue, downValue, disabledBtn, blurInput } = modifyValue(
            xInputRef,
            props,
            upBtnRef,
            downBtnRef
        );
        return {
            numberInputClassList: computed(() => [
                "x-number-input",
                "x-number-input-" + (<string>attrs.mode ?? "normal"),
            ]),
            xInputRef,
            upValue,
            downValue,
            disabledBtn,
            blurInput,
            upBtnRef,
            downBtnRef,
        };
    },
    components: {
        XInput,
        Up,
    },
});

function modifyValue(
    xInputRef: Ref,
    props: any,
    upBtnRef: Ref<HTMLDivElement | undefined>,
    downBtnRef: Ref<HTMLDivElement | undefined>
): {
    [propsName: string]: (param: any) => void;
} {
    let stepLen: number = 1;
    if (typeof props.step === "string") {
        stepLen = parseInt(props.step);
    } else {
        stepLen = props.step;
    }
    let upValue = (e: Event) => {
        // 获取当前值
        let currentValue: number =
            xInputRef.value.getCurrentValue() === ""
                ? props.min === undefined
                    ? -stepLen
                    : props.min - stepLen
                : parseFloat(xInputRef.value.getCurrentValue());
        if (props.max !== undefined && currentValue + stepLen > props.max) {
            return;
        }
        xInputRef.value.changeInputValue((currentValue + stepLen).toString());
    };

    let downValue = (e: Event) => {
        // 获取当前值
        let currentValue: number =
            xInputRef.value.getCurrentValue() === ""
                ? props.min === undefined
                    ? stepLen
                    : props.min + stepLen
                : parseFloat(xInputRef.value.getCurrentValue());
        if (props.min !== undefined && currentValue - stepLen < props.min) {
            return;
        }
        xInputRef.value.changeInputValue((currentValue - stepLen).toString());
    };
    let disabledBtn = (inputValue: string) => {
        if (inputValue === "") {
            upBtnRef.value!.classList.remove("x-number-input__button__disable");
            downBtnRef.value!.classList.remove(
                "x-number-input__button__disable"
            );
        }
        let currentValue = parseFloat(inputValue);
        // 设置按钮禁用
        if (props.max !== undefined && currentValue + stepLen > props.max) {
            upBtnRef.value!.classList.add("x-number-input__button__disable");
        } else {
            upBtnRef.value!.classList.remove("x-number-input__button__disable");
        }
        if (props.min !== undefined && currentValue - stepLen < props.min) {
            downBtnRef.value!.classList.add("x-number-input__button__disable");
        } else {
            downBtnRef.value!.classList.remove(
                "x-number-input__button__disable"
            );
        }
    };
    let blurInput = (inputValue: string) => {
        if (inputValue === "") {
            return;
        }
        let currentValue = parseFloat(inputValue);
        // 判断输入
        if (props.max !== undefined && currentValue > props.max) {
            xInputRef.value.changeInputValue(props.max.toString());
        }
        if (props.min !== undefined && currentValue < props.min) {
            xInputRef.value.changeInputValue(props.min.toString());
        }
    };
    return {
        upValue,
        downValue,
        disabledBtn,
        blurInput,
    };
}
</script>
<template>
    <div :class="numberInputClassList">
        <XInput
            v-bind="$attrs"
            type="number"
            ref="xInputRef"
            @onInputChange="disabledBtn"
            @onInputBlur="blurInput"
        />
        <div class="x-number-input__button" v-if="numberButton">
            <div
                class="x-number-input__button__top x-number-input__button__half"
                ref="upBtnRef"
                @click="upValue"
            >
                <Up />
            </div>
            <div
                class="x-number-input__button__bottom x-number-input__button__half"
                ref="downBtnRef"
                @click="downValue"
            >
                <Up />
            </div>
        </div>
    </div>
</template>
<style lang="stylus" scoped>
.x-number-input
    display inline-flex
    .x-number-input__button
        border 1px solid #e0e0e6
        margin-left 5px
        margin-top -1px
        border-radius 3px
        cursor pointer
        display flex
        flex-direction column
        .x-number-input__button__half
            height 50%
            padding 0 3px
            display flex
            align-items center
            background-color #fff
            &:hover
                background-color #f4f5f5
            &:active
                background-color #eceded
            .asa-icon
                color #888a8c
                width 8px
                height 8px
        .x-number-input__button__disable
            cursor not-allowed
            &:hover
                background-color #fff
            &:active
                background-color #fff
        .x-number-input__button__bottom
            .asa-icon
                transform rotateX(180deg)
.x-number-input-small
    height 30px
.x-number-input-normal
    height 34px
.x-number-input-large
    height 38px
</style>
