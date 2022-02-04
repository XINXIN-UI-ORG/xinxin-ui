import { defineComponent, onMounted, PropType, ref, watchEffect } from "vue";
import type { Ref } from "vue";
import style from "../../../theme-chalk/XInput.module.styl";
import { ErrorMessage, PasswordShow, PasswordHide } from "xinxin-icons";
import { createObjectExpression } from "@vue/compiler-core";

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
        disabled: {
            type: Boolean,
            default: false,
        },
        clearable: {
            type: Boolean,
            default: false,
        },
        showPasswordOn: {
            type: String as PropType<string | undefined>,
            default: undefined,
        },
    },
    setup(props, { emit, attrs, slots }) {
        let clearShow = ref<Boolean>(false);
        let passwordShow = ref<Boolean>(false);
        let passwordIcon = ref<Boolean>(false);
        const inputRef = ref<HTMLInputElement>();
        const inputWrapRef = ref<HTMLDivElement>();
        let clearBtnClick: () => void;
        let passwordBtnClick: (e: Event) => void;
        let passwordBtnDown: (e: Event) => void;
        let passwordBtnUp: (e: Event) => void;
        let passwordBtnLeave: (e: Event) => void;
        const inputWrapperClassList: Array<string> = [
            style["x-input"],
            style["x-input-" + props.mode],
        ];
        // 输入框input事件
        const inputEvent = (e: Event) => {
            const inputDom = e.target as HTMLInputElement;
            // 获取value值更新到外面
            emit("update:modelValue", inputDom.value);
        };
        // 设置禁用样式
        watchEffect(() => {
            if (
                props.disabled &&
                inputWrapperClassList.indexOf(style["x-input-disabled"]) === -1
            ) {
                inputWrapperClassList.push(style["x-input-disabled"]);
            }
            if (!props.disabled) {
                // 获取diabled类名在数组中的位置
                const arrayIndex: number[] = [];
                inputWrapperClassList.forEach((item, index) => {
                    if (item === style["x-input-disabled"]) {
                        arrayIndex.push(index);
                    }
                });
                // 删除数组中的元素
                arrayIndex.forEach((item) =>
                    inputWrapperClassList.splice(item, 1)
                );
            }
        });
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
                (clearBtnClick = clearableGather(
                    clearShow,
                    inputRef,
                    iconShowFlag
                ));
            // 是否开启密码显示功能
            props.showPasswordOn &&
                attrs.type === "password" &&
                ({
                    passwordBtnClick,
                    passwordBtnDown,
                    passwordBtnUp,
                    passwordBtnLeave,
                } = showPasswordOnGather(
                    passwordShow,
                    inputRef,
                    iconShowFlag,
                    props.showPasswordOn,
                    passwordIcon
                ));
            // 开启监听
            iconShowFlag?.init();
        });
        return () => (
            <div
                class={inputWrapperClassList}
                style={attrs.style as string}
                ref={inputWrapRef}
            >
                {slots.prefix && (
                    <div
                        class={[
                            style["x-input__fix"],
                            style["x-input__prefix"],
                        ]}
                    >
                        {slots.prefix()}
                    </div>
                )}
                <input
                    type={attrs.type as string}
                    class={style["x-input__input"]}
                    placeholder={attrs.placeholder as string}
                    autocomplete="false"
                    size={(attrs.size as string) ?? 20}
                    onInput={inputEvent}
                    disabled={props.disabled}
                    ref={inputRef}
                />
                {props.clearable && (
                    <div class={style["x-input__area"]}>
                        <ErrorMessage
                            class={style["x-input__area_icon"]}
                            v-show={clearShow.value}
                            onClick={clearBtnClick}
                        />
                    </div>
                )}
                {props.showPasswordOn && attrs.type === "password" && (
                    <div class={style["x-input__area"]}>
                        <span
                            class={style["x-input__area_icon"]}
                            v-show={passwordShow.value}
                            onClick={passwordBtnClick}
                            onMousedown={passwordBtnDown}
                            onMouseup={passwordBtnUp}
                            onMouseleave={passwordBtnLeave}
                        >
                            {passwordIcon.value ? (
                                <PasswordShow />
                            ) : (
                                <PasswordHide />
                            )}
                        </span>
                    </div>
                )}
                {slots.suffix && (
                    <div
                        class={[
                            style["x-input__fix"],
                            style["x-input__suffix"],
                        ]}
                    >
                        {slots.suffix()}
                    </div>
                )}
                <div class={style["x-input__border"]}></div>
            </div>
        );
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
        this.inputWrapRef.value?.addEventListener(
            "mouseenter",
            (event: MouseEvent) => {
                console.log(event);
                // 输入框内有内容 才显示清除按钮
                this._showClearCount += 1;
                this.executeCallback(this._showClearCount > 0);
            }
        );
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
    inputRef: Ref<HTMLInputElement | undefined>,
    iconShowFlag: IconShowFlag | null
): () => void {
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
    return () => {
        // 清除输入框数据
        inputRef.value!.value = "";
        clearShow.value = false;
    };
}

function showPasswordOnGather(
    passwordShow: Ref<Boolean>,
    inputRef: Ref<HTMLInputElement | undefined>,
    iconShowFlag: IconShowFlag | null,
    eventType: string,
    passwordIcon: Ref<Boolean>
): { [propsName: string]: (e: Event) => void } {
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

    return {
        passwordBtnClick: (event: Event) => {
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
        },
        passwordBtnDown: (event: Event) => {
            if (event.type !== eventType) {
                return;
            }
            inputRef.value!.type = "text";
            passwordIcon.value = true;
        },
        passwordBtnUp: (event: Event) => {
            if ("mousedown" !== eventType) {
                return;
            }
            // 重新设置密码为密文
            inputRef.value!.type = "password";
            passwordIcon.value = false;
        },
        passwordBtnLeave: (event: Event) => {
            if ("mousedown" !== eventType) {
                return;
            }
            // 重新设置密码为密文
            inputRef.value!.type = "password";
            passwordIcon.value = false;
        },
    };
}

export default XInput;
