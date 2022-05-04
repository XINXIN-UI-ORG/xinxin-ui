<script lang="ts">
import { defineComponent, ref } from "vue";
import { Search } from "@xinxin-ui/xinxin-icons";

export default defineComponent({
    setup() {
        return {
            click: ref(""),
            mousedown: ref(""),
        };
    },
    components: {
        Search
    },
})
</script>
<template>
    <x-input placeholder="点击触发显示密码" type="password" show-password-on="click" v-model="click" />
    <div class="split"></div>
    <x-input placeholder="鼠标按下触发显示密码" type="password" show-password-on="mousedown" v-model="mousedown">
        <template #suffix>
            <Search />
        </template>
    </x-input>
</template>