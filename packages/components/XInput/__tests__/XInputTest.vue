<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    setup() {
        let test = ref("默认值");
        return {
            test
        };
    },
})
</script>
<template>
    <div style="border: 1px solid #aaa; padding: 10px; margin-top: 10px;">
        <p>Input框：</p>
        <p>
            <x-input placeholder="请输入" type="text" v-model="test" />
            <span>{{ test }}</span>
        </p>
        <p>
            <x-input placeholder="请输入" type="text" mode="small" />
        </p>
        <p>
            <x-input placeholder="请输入" type="text" mode="large" />
        </p>
        <p>
            <x-input placeholder="请输入" type="text" size="50" />
        </p>
    </div>
</template>
