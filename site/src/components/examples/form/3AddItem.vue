<script lang="ts" setup>
import { reactive, ref } from "vue";
import { FormRules, FormInstance, XMessage } from "xinxin-ui";
import { TriggerEnum } from "xinxin-ui";

const formRef = ref<FormInstance>();
const form = reactive({
    email: '',
    domains: [
        { key: 1, value: '' }
    ],
});

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

function addDomain() {
    form.domains.push({
        key: Date.now(),
        value: '',
    });
}

function removeDomain(domain: any) {
    const index = form.domains.indexOf(domain);
    if (index !== -1) {
        form.domains.splice(index, 1);
    }
}
</script>
<template>
    <x-form :model="form" ref="formRef">
        <x-form-item label="邮件" prop="email">
            <x-input placeholder="请输入邮件" v-model="form.email" />
        </x-form-item>
        <x-form-item
            v-for="(domain, index) in form.domains"    
            :key="domain.key"
            :label="'domain' + index"
            :prop="'domains.' + index + '.value'"
            :rules="{
                required: true,
                message: 'domain不能为空',
                trigger: 'blur',
            }"
        >
            <x-input v-model="domain.value" />
            <x-button type="error" @click="removeDomain(domain)">删除Domain</x-button>
        </x-form-item>
        <x-form-item>
            <x-button type="warning" @click="submitForm(formRef)">提交</x-button>
            <x-button type="success">取消</x-button>
            <x-button secondary type="warning" @click="addDomain">添加domain</x-button>
        </x-form-item>
    </x-form>
</template>