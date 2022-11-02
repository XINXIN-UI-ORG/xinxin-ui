<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { FormRules, FormInstance } from "xinxin-ui";

export default defineComponent({
    setup() {
        const formRef = ref<FormInstance>();
        const form = reactive({
            name: "",
            age: "",
            poems: "",
            read: false,
            poet: [],
            favorite: "",
        });

        const rules = reactive<FormRules>({
            name: [
                { required: true, message: "请填写名称", trigger: "blur" },
                { minLength: 6, message: "最少需要6个字符", trigger: 'change' },
                { maxLength: 10, message: "最大长度超限", trigger: 'blur' },
            ],
            age: [
                { required: true, message: "请输入年龄", trigger: "blur" },
                { minLength: 6, message: "最少需要6个字符", trigger: 'change' },
            ],
        });

        return {
            formRef,
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
            rules,
            submitForm(formIns: FormInstance | undefined) {
                if (!formIns) {
                    return;
                }

                formIns.validate();
            }, 
        };
    },
});
</script>
<template>
    <x-form :rules="rules" ref="formRef">
        <x-form-item label="姓名" rule-name="name">
            <x-input placeholder="请输入姓名" v-model="form.name" />
        </x-form-item>
        <x-form-item label="年龄" rule-name="age">
            <x-number-input placeholder="请输入年龄" v-model="form.age" number-button />
        </x-form-item>
        <x-form-item label="喜爱诗集" rule-name="poems">
            <x-select
                :options="options"
                placeholder="选择诗集"
                v-model="form.poems"
            >
            </x-select>
        </x-form-item>
        <x-form-item label="是否喜欢读书" rule-name="read">
            <x-switch v-model="form.read"></x-switch>
        </x-form-item>
        <x-form-item label="喜欢诗人" rule-name="poet">
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
        <x-form-item label="爱好" rule-name="favorite">
            <x-radio-group v-model="form.favorite">
                <x-radio value="0">编程</x-radio>
                <x-radio value="1">写作</x-radio>
                <x-radio value="2">画画</x-radio>
            </x-radio-group>
        </x-form-item>
        <x-form-item>
            <x-button type="warning" @click="submitForm(formRef)">提交</x-button>
            <x-button type="success">取消</x-button>
        </x-form-item>
    </x-form>
</template>