<script lang="ts" setup>
import { reactive, ref } from "vue";
import { FormRules, FormInstance, XMessage } from "xinxin-ui";
import { TriggerEnum } from "xinxin-ui";

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
        { required: true, message: "请填写名称", trigger: TriggerEnum.blur },
        { min: 6, message: "最少需要6个字符", trigger: [TriggerEnum.blur, TriggerEnum.change] },
        { max: 20, message: "名称长度不能超过20个字符", trigger: TriggerEnum.blur },
        { pattern: /^[a-z]+$/, message: "名称中不能有数字", trigger: TriggerEnum.blur },
    ],
    age: [
        { required: true, message: "请输入年龄", trigger: TriggerEnum.blur },
        { validator: checkAge, trigger: [TriggerEnum.change, TriggerEnum.blur] },
    ],
});

function checkAge(rule: any, value: any, callback: any) {
    if (!value) {
        callback(new Error('请输入年龄'));
        return;
    }

    setTimeout(() => {
        if (value < 18) {
            callback(new Error('年龄太小了'));
        } else {
            callback();
        }
    }, 3000);
}

const options = [
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
];

const submitForm = (formIns: FormInstance | undefined) => {
    if (!formIns) {
        return;
    }

    formIns.validate((valid, fields) => {
        if (valid) {
            XMessage({
                message: '提交成功',
                type: 'success'
            });
        } else {
            console.log(fields);
            XMessage({
                message: '验证失败',
                type: 'error'
            });
        }
    });
};
</script>
<template>
    <x-form :rules="rules" :model="form" ref="formRef">
        <x-form-item label="姓名" prop="name">
            <x-input placeholder="请输入姓名" v-model="form.name" />
        </x-form-item>
        <x-form-item label="年龄" prop="age">
            <x-number-input placeholder="请输入年龄" v-model="form.age" number-button />
        </x-form-item>
        <x-form-item label="喜爱诗集" prop="poems">
            <x-select :options="options" placeholder="选择诗集" v-model="form.poems">
            </x-select>
        </x-form-item>
        <x-form-item label="是否喜欢读书" prop="read">
            <x-switch v-model="form.read"></x-switch>
        </x-form-item>
        <x-form-item label="喜欢诗人" prop="poet">
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
        <x-form-item label="爱好" prop="favorite">
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