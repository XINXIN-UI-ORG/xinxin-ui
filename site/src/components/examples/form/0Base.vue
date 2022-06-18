<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
    setup() {
        const form = reactive({
            name: "",
            age: "",
            poems: "",
        });

        return {
            form,
            options: [
                {
                    label: "《庐山谣寄卢侍御虚舟》",
                    value: "1"
                },
                {
                    label: "《下终南山过斛斯山人宿置酒》",
                    value: "2"
                },
                {
                    label: "《子夜四时歌·夏歌》",
                    value: "3",
                },
                {
                    label: "《子夜四时歌·冬歌》",
                    value: "4"
                },
            ],
        };
    },
});
</script>
<template>
    <x-form>
        <x-form-item label="姓名">
            <x-input placeholder="请输入姓名" v-model="form.name" />
        </x-form-item>
        <x-form-item label="年龄">
            <x-number-input placeholder="请输入年龄" v-model="form.age" number-button />
        </x-form-item>
        <x-form-item label="喜爱诗集">
            <x-select
                :options="options"
                placeholder="选择诗集"
                v-model="form.poems"
            >
            </x-select>
        </x-form-item>
    </x-form>

    {{ form }}
</template>