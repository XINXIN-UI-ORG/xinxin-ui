<script lang="ts">
import { computed, ComputedRef, defineComponent, Ref, ref } from "vue";
import XInput from "../../XInput";
import { Up, Down } from "@xinxin-ui/xinxin-icons";

export default defineComponent({
    name: "x-number-input",
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
        // 是否禁用
        let disabled = computed(() => {
            return !(attrs.disabled === undefined || attrs.disabled === false);

        });
        let { upValue, downValue, disabledBtn, blurInput } = modifyValue(
            xInputRef,
            props,
            upBtnRef,
            downBtnRef,
            disabled
        );
        return {
            numberInputClassList: computed(() => [
                "x-number-input",
                "x-number-input-" + (<string>attrs.size ?? "normal"),
            ]),
            statusClass: computed(() => {
                return attrs.status === undefined
                        ? ''
                        : 'x-number-input__' + attrs.status;
            }),
            disabled,
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
        Down,
    },
});

function modifyValue(
    xInputRef: Ref,
    props: any,
    upBtnRef: Ref<HTMLDivElement | undefined>,
    downBtnRef: Ref<HTMLDivElement | undefined>,
    disabled: ComputedRef<boolean>
): {
    [propsName: string]: (param: any) => void;
} {
    let stepLen: number;
    if (typeof props.step === "string") {
        stepLen = parseInt(props.step);
    } else {
        stepLen = props.step;
    }
    let decimalPlaces = (value: number) => {
        let numberArr = value.toString().split(".");
        if (numberArr.length === 1) {
            return 1;
        }
        return 10**numberArr[1].length;
    };
    let upValue = (e: Event) => {
        if (disabled.value) {
            return;
        }
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
        // 获取小数位数
        let decimalLength = decimalPlaces(currentValue);
        xInputRef.value.changeInputValue((((currentValue * decimalLength) + (stepLen * decimalLength)) / decimalLength).toString());
    };
    let downValue = (e: Event) => {
        if (disabled.value) {
            return;
        }
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
        // 获取小数位数
        let decimalLength = decimalPlaces(currentValue);
        xInputRef.value.changeInputValue((((currentValue * decimalLength) - (stepLen * decimalLength)) / decimalLength).toString());
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
            class="x-number-input__input"
        />
        <div
            :class="[
                'x-number-input__button',
                statusClass,
            ]"
            v-if="numberButton"
        >
            <div
                :class="[
                    'x-number-input__button__top',
                    'x-number-input__button__half',
                    disabled ? 'x-number-input__button__disable' : '',
                ]"
                ref="upBtnRef"
                @click="upValue"
            >
                <Up />
            </div>
            <div
                :class="[
                    'x-number-input__button__bottom',
                    'x-number-input__button__half',
                    disabled ? 'x-number-input__button__disable' : '',
                ]"
                ref="downBtnRef"
                @click="downValue"
            >
                <Down />
            </div>
        </div>
    </div>
</template>
<style lang="stylus" scoped>
.x-number-input
    display flex
    .x-number-input__input
        flex 1
    .x-number-input__button
        border 1px solid #e0e0e6
        margin 0 0 0 5px
        border-radius 4px
        overflow hidden
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
                width 10px
                height 10px
        .x-number-input__button__disable
            cursor not-allowed
            background-color #f7f7f7
            &:hover
                background-color #f7f7f7
            &:active
                background-color #f7f7f7
    .x-number-input__error
        border-color #F56C6C
        .asa-icon
            color #F56C6C !important
.x-number-input-small
    height 30px
.x-number-input-normal
    height 34px
.x-number-input-large
    height 38px
</style>
