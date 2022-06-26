<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import type { Ref } from "vue";
import { MODEL_VALUE_UPDATE } from "@xinxin-ui/constants";
import { ErrorMessage, PasswordShow, PasswordHide } from "@xinxin-ui/xinxin-icons";
import { isNumber, isString } from "@vueuse/core";
import { inputProps, useInput } from "./input";

export default defineComponent({
    name: "x-input",
    props: inputProps,
    emits: {
        onInputChange: null,
        onInputBlur: null,
        onInputFocus: null,
        [MODEL_VALUE_UPDATE]: (value: string | number) => isNumber(value) || isString(value),
    },
    setup(props, { attrs, slots, emit, expose }) {
        let clearShow = ref<Boolean>(false);
        let passwordShow = ref<Boolean>(false);
        let passwordIcon = ref<Boolean>(false);
        let focusFlag = ref<boolean>(false);
        const inputRef = ref<HTMLInputElement>();
        const inputWrapRef = ref<HTMLDivElement>();
        const clearIconRef = ref<HTMLSpanElement>();
        const passwordIconRef = ref<HTMLSpanElement>();
        // 输入框内容清除事件
        onMounted(() => {
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
                    clearIconRef,
                    emit
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
        let focus = (): void => {
            inputRef.value?.focus();
        };

        let { xFormItem } = useInput(props);
        // 提供操作input的方法
        expose({
            changeInputValue(value: string) {
                emit("update:modelValue", value);
                inputRef.value!.value = value;
                emit("onInputChange", value);
            },
            getCurrentValue(): string {
                return inputRef.value!.value;
            },
            focus,
            blur(): void {
                inputRef.value?.blur();
            }
        });

        return {
            inputWrapperClassList: computed(() => [
                "x-input",
                "x-input-" + xFormItem.size,
                props.disabled && "x-input-disabled",
                props.status && "x-input-" + props.status,
                props._cursor && "x-input-cursor",
                focusFlag.value && 'x-input-focus',
            ]),
            focus,
            prefix: slots.prefix,
            suffix: slots.suffix,
            inputType: () => {
                let type: string = <string>attrs.type ?? "text";
                if (["text", "password", "number"].indexOf(type) === -1) {
                    return "text";
                }
                return type;
            },
            blurEvent(e: Event) {
                focusFlag.value = false;
                const inputDom = e.target as HTMLInputElement;
                emit("onInputBlur", inputDom.value);
            },
            focusEvent(e: Event) {
                focusFlag.value = true;
                const inputDom = e.target as HTMLInputElement;
                emit("onInputFocus", inputDom.value);
            },
            clearShow,
            inputRef,
            inputWrapRef,
            passwordShow,
            passwordIcon,
            clearIconRef,
            passwordIconRef,
            stopBlur(e: Event) {
                e.preventDefault();
                return false;
            },
            modelValue: computed({
                get() {
                    return props.modelValue;
                },
                set(value: string | number) {
                    // 获取value值更新到外面
                    emit(MODEL_VALUE_UPDATE, value);
                    emit("onInputChange", value);
                }
            }),
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
    clearIconRef: Ref<HTMLSpanElement | undefined>,
    emit: any
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
        emit("update:modelValue", "");
        emit("onInputChange", "");
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
        document.addEventListener("mouseup", () => {
            if ("mousedown" !== eventType) {
                return;
            }
            // 重新设置密码为密文
            inputRef.value!.type = "password";
            passwordIcon.value = false;
        });
    });
}
</script>
<template>
    <div
        :class="inputWrapperClassList"
        ref="inputWrapRef"
        @click="focus"
        @mousedown="stopBlur"
        @mouseup="stopBlur"
    >
        <div :class="['x-input__left', _hiddenInput && 'x-input__left-hidden']">
            <div class="x-input__fix x-input__prefix" v-if="prefix">
                <slot name="prefix"></slot>
            </div>
            <input
                :type="inputType()"
                class="x-input__input"
                :placeholder="placeholder"
                autocomplete="new-password"
                @blur="blurEvent"
                @focus="focusEvent"
                :disabled="disabled"
                :readonly="readonly"
                ref="inputRef"
                v-model="modelValue"
            />
        </div>
        <div class="x-input__area" v-if="clearable">
            <span v-show="clearShow && !disabled" ref="clearIconRef">
                <ErrorMessage
                    class="x-input__area-icon"
                    @mousedown="stopBlur"
                    @mouseup="stopBlur"
                />
            </span>
        </div>
        <div
            class="x-input__area"
            v-if="showPasswordOn && inputType() === 'password'"
        >
            <span v-show="passwordShow" ref="passwordIconRef">
                <component
                    :is="passwordIcon ? 'PasswordShow' : 'PasswordHide'"
                    class="x-input__area-icon"
                    @mousedown="stopBlur"
                    @mouseup="stopBlur"
                />
            </span>
        </div>
        <div class="x-input__fix x-input__suffix" v-if="suffix">
            <slot name="suffix"></slot>
        </div>
    </div>
</template>
<style lang="stylus" scoped src="../style/input.styl" />
