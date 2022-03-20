<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    setup() {
        let c2Disabled = ref(true);
        return {
            c1: ref(false),
            c2: ref(false),
            c2Disabled,
            c2ButtonToogle() {
                c2Disabled.value = !c2Disabled.value;
            }
        };
    },
})
</script>
<template>
    <div style="border: 1px solid #aaa; padding: 10px; margin-top: 10px">
        <p>复选框：</p>
        <p>
            基础用法：
            <x-checkbox name="test" v-model:checked="c1" value="2" label="和客户"></x-checkbox>
            {{c1}}
        </p>
        <p>
            禁用：
            <x-checkbox v-model:checked="c2" 
            label="客户" :disabled="c2Disabled"></x-checkbox>
            &nbsp;
            {{c2}}
            <x-button @click="c2ButtonToogle">disable toogle</x-button>
        </p>
    </div>
</template>
