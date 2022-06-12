<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
    setup() {
        const form = reactive({
            name: "",
            age: 0,
        });

        return {
            form,
        };
    },
});
</script>
<template>
    <x-form>
        <x-form-item label="姓名">
            <x-input placeholder="请输入姓名" v-model="form.name" />
        </x-form-item>
        <x-form-item label="年龄是">
            <x-number-input placeholder="请输入年龄" v-model="form.age" />
        </x-form-item>
    </x-form>

    {{ form }}
</template>