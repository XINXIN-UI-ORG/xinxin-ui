<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    setup() {},
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
            <x-number-input placeholder="数字输入" number-button />
        </p>
        <p>
            大：
            <x-number-input placeholder="数字输入" mode="small" number-button />
        </p>
        <p>
            小：
            <x-number-input placeholder="数字输入" mode="large" number-button />
        </p>
    </div>
</template>
