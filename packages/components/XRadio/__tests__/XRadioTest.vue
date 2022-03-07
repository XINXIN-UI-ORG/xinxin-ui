<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        return {
            r1: ref("1"),
            r2: ref("1"),
            radioValue: ref(""),
        };
    },
});
</script>
<template>
    <div style="border: 1px solid #aaa; padding: 10px; margin-top: 10px">
        <p>单选框：</p>
        <p>
            单选：
            <x-radio v-model="radioValue" value="1">单选</x-radio>
            {{radioValue}}
        </p>
        <p>
            基础使用：
            <x-radio v-model="r1" value="1" name="r1">允许取消选择</x-radio>
            &nbsp;
            <x-radio v-model="r1" value="2" name="r1">单选2</x-radio>
            &nbsp;
            {{ r1 }}
        </p>
        <p>
            带描述：
            <div style="width: 300px;">
                <x-radio v-model="r2" value="2" name="r2">
                带描述
                <template #description>
                    这是一段描述，这是一段描述，这是一段描述，这是一段描述，这是一段描述，这是一段描述，这是一段描述。
                </template>
            </x-radio>
            </div>
        </p>
    </div>
</template>
