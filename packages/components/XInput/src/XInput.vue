<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import type { PropType, Ref } from "vue";
import { ErrorMessage, PasswordShow, PasswordHide } from "xinxin-icons";

export default defineComponent({
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
        disabled: {
            type: Boolean,
            default: false,
        },
        clearable: {
            type: Boolean,
            default: false,
        },
        showPasswordOn: {
            type: String,
            default: undefined,
        },
        status: {
            type: String,
            default: undefined,
        },
        placeholder: String,
        size: {
            type: [Number, String],
            default: 20,
        },
        style: Object,
    },
    setup(props, { attrs, slots, emit }) {
        let clearShow = ref<Boolean>(false);
        let passwordShow = ref<Boolean>(false);
        let passwordIcon = ref<Boolean>(false);
        const inputRef = ref<HTMLInputElement>();
        const inputWrapRef = ref<HTMLDivElement>();
        const clearIconRef = ref<HTMLSpanElement>();
        const passwordIconRef = ref<HTMLSpanElement>();
        // 输入框内容清除事件
        onMounted(() => {
            // 为input设置初始值
            props.modelValue &&
                inputRef.value?.setAttribute("value", props.modelValue);
            let iconShowFlag: IconShowFlag | null = null;
            if (
                props.clearable ||
                (props.showPasswordOn && attrs.type === "password")
            ) {
                iconShowFlag = new IconShowFlag(inputRef, inputWrapRef);
            }
            // 是否开启清除功能
            props.clearable &&
                clearableGather(
                    clearShow,
                    passwordShow,
                    inputRef,
                    iconShowFlag,
                    clearIconRef
                );
            // 是否开启密码显示功能
            props.showPasswordOn &&
                attrs.type === "password" &&
                showPasswordOnGather(
                    passwordShow,
                    inputRef,
                    iconShowFlag,
                    props.showPasswordOn,
                    passwordIcon,
                    passwordIconRef
                );
            // 开启监听
            iconShowFlag?.init();
        });
        return {
            inputWrapperClassList: computed(() => [
                "x-input",
                "x-input-" + props.mode,
                props.disabled && "x-input-disabled",
                props.status && "x-input-" + props.status,
            ]),
            prefix: slots.prefix,
            suffix: slots.suffix,
            inputType: () => {
                let type: string = <string>attrs.type ?? "text";
                if (["text", "password", "number"].indexOf(type) === -1) {
                    return "text";
                }
                return type;
            },
            inputEvent(e: Event) {
                const inputDom = e.target as HTMLInputElement;
                // 获取value值更新到外面
                emit("update:modelValue", inputDom.value);
            },
            clearShow,
            inputRef,
            inputWrapRef,
            passwordShow,
            passwordIcon,
            clearIconRef,
            passwordIconRef,
        };
    },
    components: {
        ErrorMessage,
        PasswordShow,
        PasswordHide,
    },
});

/**
 * 是否需要显示标签 包括清除内容标签 显示密码标签
 */
class IconShowFlag {
    private _showClearCount = 0;
    private inputRef: Ref<HTMLInputElement | undefined>;
    private inputWrapRef: Ref<HTMLDivElement | undefined>;
    private callbackList: Array<(showable: boolean) => void> = [];

    constructor(
        inputRef: Ref<HTMLInputElement | undefined>,
        inputWrapRef: Ref<HTMLDivElement | undefined>
    ) {
        this.inputRef = inputRef;
        this.inputWrapRef = inputWrapRef;
    }

    /**
     * 注册回调函数
     * @param callback 回调函数
     */
    public registerCallback(callback: (showable: boolean) => void): void {
        this.callbackList.push(callback);
    }

    /**
     * 执行所有的回调函数
     * @param showable 是否应该显示图标
     */
    private executeCallback(showable: boolean): void {
        if (this.callbackList.length !== 0) {
            this.callbackList.forEach((item) => item(showable));
        }
    }

    /**
     * 初始化各类事件 统计是否需要显示图标
     */
    public init(): void {
        // 鼠标移入时检查是否需要显示
        this.inputWrapRef.value?.addEventListener("mouseenter", () => {
            // 输入框内有内容 才显示清除按钮
            this._showClearCount += 1;
            this.executeCallback(this._showClearCount > 0);
        });
        // 鼠标移出不需要显示
        this.inputWrapRef.value?.addEventListener("mouseleave", () => {
            // 如果失去焦点则不展示
            this._showClearCount -= 1;
            this.executeCallback(this._showClearCount > 0);
        });
        this.inputRef.value?.addEventListener("focus", () => {
            this._showClearCount += 1;
            this.executeCallback(this._showClearCount > 0);
        });
        this.inputRef.value?.addEventListener("blur", () => {
            this._showClearCount -= 1;
            this.executeCallback(this._showClearCount > 0);
        });
    }
}

/**
 * 清除按钮功能
 * @param clearShow 是否显示清除按钮
 * @param inputRef 输入框对象
 * @param iconShowFlag 显示标签对象
 * @returns 清除点击事件
 */
function clearableGather(
    clearShow: Ref<Boolean>,
    passwordShow: Ref<Boolean>,
    inputRef: Ref<HTMLInputElement | undefined>,
    iconShowFlag: IconShowFlag | null,
    clearIconRef: Ref<HTMLSpanElement | undefined>
): void {
    // 输入框输入时检查是否需要显示
    inputRef.value?.addEventListener("input", () => {
        clearShow.value = inputRef.value?.value.length !== 0;
    });
    /**
     * 注册显示回调函数
     */
    iconShowFlag?.registerCallback((showable) => {
        clearShow.value = showable && inputRef.value?.value.length! > 0;
    });
    // 为清除按钮绑定点击事件
    clearIconRef.value?.addEventListener("click", () => {
        // 清除输入框数据
        inputRef.value!.value = "";
        clearShow.value = false;
        passwordShow.value = false;
    });
}

function showPasswordOnGather(
    passwordShow: Ref<Boolean>,
    inputRef: Ref<HTMLInputElement | undefined>,
    iconShowFlag: IconShowFlag | null,
    eventType: string,
    passwordIcon: Ref<Boolean>,
    passwordIconRef: Ref<HTMLSpanElement | undefined>
): void {
    // 输入框输入时检查是否需要显示
    inputRef.value?.addEventListener("input", () => {
        passwordShow.value = inputRef.value?.value.length !== 0;
    });
    /**
     * 注册显示回调函数
     */
    iconShowFlag?.registerCallback((showable) => {
        passwordShow.value = showable && inputRef.value?.value.length! > 0;
    });
    // 绑定各种事件显示或隐藏密文
    passwordIconRef.value?.addEventListener("click", (event: Event) => {
        if (event.type !== eventType) {
            return;
        }
        if (inputRef.value?.type === "password") {
            inputRef.value!.type = "text";
            passwordIcon.value = true;
        } else {
            inputRef.value!.type = "password";
            passwordIcon.value = false;
        }
    });
    passwordIconRef.value?.addEventListener("mousedown", (event: Event) => {
        if (event.type !== eventType) {
            return;
        }
        inputRef.value!.type = "text";
        passwordIcon.value = true;
    });
    passwordIconRef.value?.addEventListener("mouseup", () => {
        if ("mousedown" !== eventType) {
            return;
        }
        // 重新设置密码为密文
        inputRef.value!.type = "password";
        passwordIcon.value = false;
    });
    passwordIconRef.value?.addEventListener("mouseleave", () => {
        if ("mousedown" !== eventType) {
            return;
        }
        // 重新设置密码为密文
        inputRef.value!.type = "password";
        passwordIcon.value = false;
    });
}
</script>
<template>
    <div :class="inputWrapperClassList" :style="style" ref="inputWrapRef">
        <div class="x-input__fix x-input__prefix" v-if="prefix">
            <slot name="prefix"></slot>
        </div>
        <input
            :type="inputType()"
            class="x-input__input"
            :placeholder="placeholder"
            autocomplete="new-password"
            :size="size"
            @input="inputEvent"
            :disabled="disabled"
            ref="inputRef"
        />
        <div class="x-input__area" v-if="clearable">
            <span v-show="clearShow" ref="clearIconRef">
                <ErrorMessage class="x-input__area-icon" />
            </span>
        </div>
        <div
            class="x-input__area"
            v-if="showPasswordOn && inputType() === 'password'"
        >
            <span v-show="passwordShow" ref="passwordIconRef">
                <PasswordShow
                    class="x-input__area-icon"
                    v-show="passwordIcon"
                />
                <PasswordHide
                    class="x-input__area-icon"
                    v-show="!passwordIcon"
                />
            </span>
        </div>
        <div class="x-input__fix x-input__suffix" v-if="suffix">
            <slot name="suffix"></slot>
        </div>
        <div class="x-input__border"></div>
    </div>
</template>
<style lang="stylus" scoped>
.x-input
    display inline-flex
    border-radius 3px
    padding 0 12px
    cursor text
    position relative
    background-color #fff
    vertical-align middle
    &:hover
        .x-input__border
            border-color #f5a31f
    .x-input__border
        border 1px solid #e0e0e6
        transition border-color .3s, box-shadow .3s
        position absolute
        border-radius 3px
        top -1px
        left -1px
        bottom -1px
        right -1px
        z-index -1
    .x-input__input
        height 100%
        padding 0
        border none
        outline none
        background-color transparent
        caret-color #f5a31f
        &::-webkit-inner-spin-button, &::-webkit-outer-spin-button
            -webkit-appearance none
        &[type="number"]
            -moz-appearance textfield
        &:focus
            ~ .x-input__border
                border-color #f5a31f
                box-shadow 0 0 1px 2px rgba(245, 163, 31, .25)
    .x-input__fix
        height 100%
        overflow hidden
        display flex
        align-items center
        color #333639
    .x-input__prefix
        padding-right 12px
    .x-input__suffix
        padding-left 12px
    .x-input__area
        height 100%
        width 16px
        display flex
        align-items center
        padding-left 6px
        .x-input__area-icon
            color #727577
            cursor pointer
            &:hover
                color #f5a31f
            &:active
                color #f19809
.x-input-small
    height 28px
.x-input-normal
    height 32px
.x-input-large
    height 36px
.x-input-disabled
    background-color #f7f7f7
    cursor not-allowed
    &:hover
        .x-input__border
            border-color #e0e0e6
    .x-input__input
        cursor not-allowed
.x-input-error
    .x-input__border
        border-color #F56C6C
    .x-input__input
        caret-color #F56C6C
        &:focus
            ~ .x-input__border
                border-color #F56C6C
                box-shadow 0 0 1px 2px rgba(245, 108, 108, .25)
    &:hover
        .x-input__border
            border-color #F56C6C
</style>
