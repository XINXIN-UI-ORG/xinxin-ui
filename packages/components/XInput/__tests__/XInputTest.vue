<script lang="ts">
import { defineComponent, ref } from "vue";
import { Search } from "xinxin-icons";

export default defineComponent({
    setup() {
        let test = ref("默认值");
        let inputDisabled = ref(true);
        return {
            test,
            inputDisabled,
            InputDisabled() {
                inputDisabled.value = !inputDisabled.value;
            },
            inputChange(inputValue: string) {
                console.log(inputValue);
            },
            inputBlur(inputValue: string) {
                console.log(inputValue);
            },
            inputFocus(inputValue: string) {
                console.log(inputValue);
            },
        };
    },
    components: {
        Search,
    },
});
</script>
<template>
    <div style="border: 1px solid #aaa; padding: 10px; margin-top: 10px">
        <p>Input框：</p>
        <p>
            基础用法：
            <x-input placeholder="请输入" v-model="test" />
            <span>{{ test }}</span>
        </p>
        <p>
            小：
            <x-input placeholder="请输入" type="text" mode="small" />
        </p>
        <p>
            大：
            <x-input placeholder="请输入" type="text" mode="large" />
        </p>
        <p>
            width：
            <x-input placeholder="请输入" type="text" width="50" />
        </p>
        <p>
            禁用：
            <x-input
                placeholder="请输入"
                type="text"
                :disabled="inputDisabled"
                clearable
            />
            &nbsp;&nbsp;
            <x-button type="success" @click="InputDisabled"
                >禁用button</x-button
            >
        </p>
        <p>
            前后缀：
            <x-input placeholder="请输入" type="text" />
            &nbsp;&nbsp;
            <x-input placeholder="请输入" type="text">
                <template #prefix>Prefix</template>
            </x-input>
            &nbsp;&nbsp;
            <x-input placeholder="请输入" type="text">
                <template #suffix>Suffix</template>
            </x-input>
            &nbsp;&nbsp;
            <x-input placeholder="请输入" type="text">
                <template #prefix>
                    <Search />
                </template>
            </x-input>
            &nbsp;&nbsp;
            <x-input placeholder="请输入" type="text">
                <template #suffix>
                    <Search />
                </template>
            </x-input>
        </p>
        <p>
            可清除：
            <x-input placeholder="请输入" type="text" clearable />
            &nbsp;&nbsp;
            <x-input placeholder="请输入" type="text" clearable>
                <template #suffix>Suffix</template>
            </x-input>
            &nbsp;&nbsp;
            <x-input placeholder="请输入" type="text" clearable>
                <template #suffix>
                    <Search />
                </template>
            </x-input>
        </p>
        <p>
            密码模式：
            <x-input placeholder="请输入" type="password" clearable show-password-on="click" />
            &nbsp;&nbsp;
            <x-input placeholder="请输入" type="password" clearable show-password-on="mousedown">
                <template #suffix>Suffix</template>
            </x-input>
            &nbsp;&nbsp;
            <x-input placeholder="请输入" type="password" clearable show-password-on="click">
                <template #suffix>
                    <Search />
                </template>
            </x-input>
            &nbsp;&nbsp;
            <x-input placeholder="请输入" type="password" show-password-on="click" />
        </p>
        <p>
            输入框状态：
            <x-input placeholder="请输入" type="password" status="error" />
        </p>
        <p>
            块级输入框：
            <x-input placeholder="块级输入" block />
            <br>
            <x-input placeholder="请输入" type="text" block>
                <template #prefix>
                    <Search />
                </template>
                <template #suffix>
                    <Search />
                </template>
            </x-input>
        </p>
        <p>
            输入框样式：
            <x-input placeholder="请输入" type="password" style="background-color: #aaa;" />
        </p>
        <p>
            onInput事件：
            <x-input placeholder="请输入" @onInputChange="inputChange" />
        </p>
        <p>
            onBlur事件：
            <x-input placeholder="请输入" @onInputBlur="inputBlur" />
        </p>
        <p>
            onFocus事件：
            <x-input placeholder="请输入" @onInputFocus="inputFocus" />
        </p>
    </div>
</template>
