<script lang="ts">
import { defineComponent } from "vue";
import { Search } from "@xinxin-ui/xinxin-icons";

export default defineComponent({
    setup() {
    },
    components: {
        Search
    },
})
</script>
<template>
    <x-input placeholder="点击触发显示密码" type="password" show-password-on="click" block />
    <x-input placeholder="鼠标按下触发显示密码" type="password" show-password-on="mousedown" block>
        <template #suffix>
            <Search />
        </template>
    </x-input>
</template>