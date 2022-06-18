<script lang="ts">
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
    setup() {
        const form = reactive({
            name: "",
            age: 0,
        });

        return {
            form,
            labelPosition: ref<string>('left'),
            size: ref<string>('normal'),
        };
    },
});
</script>
<template>
    <x-radio-group v-model="labelPosition">
        <x-radio-button value="left">
            Left
        </x-radio-button>
        <x-radio-button value="right">
            Right
        </x-radio-button>
        <x-radio-button value="top">
            Top
        </x-radio-button>
    </x-radio-group>
    <span class="separator"></span>
    <x-radio-group v-model="size">
        <x-radio-button value="large">
            large
        </x-radio-button>
        <x-radio-button value="normal">
            normal
        </x-radio-button>
        <x-radio-button value="small">
            small
        </x-radio-button>
    </x-radio-group>
    
    <div class="split"></div>
    <div class="split"></div>
    
    <x-form :label-position="labelPosition" :size="size">
        <x-form-item label="姓名">
            <x-input placeholder="请输入姓名" v-model="form.name" />
        </x-form-item>
        <x-form-item label="年龄是">
            <x-number-input placeholder="请输入年龄" v-model="form.age" number-button />
        </x-form-item>
    </x-form>

    {{ form }}
</template>