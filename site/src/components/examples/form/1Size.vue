<script lang="ts">
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
    setup() {
        const form = reactive({
            name: "",
            age: "",
            poems: "",
            read: false,
            poet: [],
            favorite: "",
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
    
    <x-form :size="size" :label-position="labelPosition">
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
        <x-form-item label="是否喜欢读书">
            <x-switch v-model="form.read"></x-switch>
        </x-form-item>
        <x-form-item label="喜欢诗人">
            <x-checkbox-group v-model="form.poet">
                <x-checkbox value="0">李白</x-checkbox>
                <x-checkbox value="1">杜甫</x-checkbox>
                <x-checkbox value="2">韩愈</x-checkbox>
                <x-checkbox value="3">柳宗元</x-checkbox>
                <x-checkbox value="4">王安石</x-checkbox>
                <x-checkbox value="5">陆游</x-checkbox>
                <x-checkbox value="6">白居易</x-checkbox>
                <x-checkbox value="7">苏轼</x-checkbox>
                <x-checkbox value="8">辛弃疾</x-checkbox>
                <x-checkbox value="9">李商隐</x-checkbox>
                <x-checkbox value="10">陶渊明</x-checkbox>
                <x-checkbox value="11">刘禹锡</x-checkbox>
            </x-checkbox-group>
        </x-form-item>
        <x-form-item label="爱好">
            <x-radio-group v-model="form.favorite">
                <x-radio value="0">编程</x-radio>
                <x-radio value="1">写作</x-radio>
                <x-radio value="2">画画</x-radio>
            </x-radio-group>
        </x-form-item>
        <x-form-item>
            <x-button type="warning">提交</x-button>
            <x-button type="success">取消</x-button>
        </x-form-item>
    </x-form>
</template>