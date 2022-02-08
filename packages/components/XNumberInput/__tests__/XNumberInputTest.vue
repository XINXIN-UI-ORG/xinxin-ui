<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        let numberValue = ref(123);
        let disabled = ref(true);
        return {
            numberValue,
            disabled,
            changeDisabled() {
                disabled.value = !disabled.value;
            },
            inputChange(inputValue: string) {
                console.log(inputValue);
            },
            inputBlur(inputValue: string) {
                console.log(inputValue);
            },
            inputFocus(inputValue: string) {
                console.log(inputValue);
            },
        };
    },
});
</script>
<template>
    <div style="border: 1px solid #aaa; padding: 10px; margin-top: 10px">
        <p>数字输入框：</p>
        <p>
            基础使用：
            <x-number-input placeholder="数字输入" />
        </p>
        <p>
            带加减按钮：
            <x-number-input
                placeholder="数字输入"
                clearable
                number-button
                v-model="numberValue"
            />
            {{ numberValue }}
        </p>
        <p>
            小：
            <x-number-input placeholder="数字输入" mode="small" number-button />
        </p>
        <p>
            大：
            <x-number-input placeholder="数字输入" mode="large" number-button />
        </p>
        <p>
            设置步长：
            <x-number-input
                placeholder="数字输入"
                mode="large"
                number-button
                clearable
                step="2"
            />
            &nbsp; &nbsp;
            <x-number-input
                placeholder="数字输入"
                mode="large"
                number-button
                clearable
                :step="3"
            />
        </p>
        <p>
            最大最小限制：
            <x-number-input
                placeholder="数字输入"
                number-button
                clearable
                :max="6"
            />
            &nbsp; &nbsp;
            <x-number-input
                placeholder="数字输入"
                number-button
                clearable
                :min="1"
            />
            &nbsp; &nbsp;
            <x-number-input
                placeholder="数字输入"
                number-button
                clearable
                :max="6"
                :min="1"
            />
        </p>
        <p>
            禁用输入：
            <x-number-input
                placeholder="数字输入"
                number-button
                clearable
                :max="6"
                :disabled="disabled"
            />
            &nbsp; &nbsp;
            <x-button @click="changeDisabled">禁用切换</x-button>
        </p>
        <p>
            onInput事件：
            <x-number-input
                placeholder="数字输入"
                number-button
                clearable
                @onInputChange="inputChange"
            />
        </p>
        <p>
            onBlur事件：
            <x-number-input
                placeholder="数字输入"
                number-button
                clearable
                @onInputBlur="inputBlur"
            />
        </p>
        <p>
            onFocus事件：
            <x-number-input
                placeholder="数字输入"
                number-button
                clearable
                @onInputFocus="inputFocus"
            />
        </p>
    </div>
</template>
