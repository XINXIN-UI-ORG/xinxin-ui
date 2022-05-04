<script lang="ts">
import { defineComponent, ref } from "vue";
import { Search } from "@xinxin-ui/xinxin-icons";

export default defineComponent({
    setup() {
        return {
            v1: ref(""),
            v2: ref(""),
            v3: ref(""),
        };
    },
    components: {
        Search
    },
})
</script>
<template>
    <x-input placeholder="请输入" clearable v-model="v1" />
    <div class="split"></div>
    <x-input placeholder="请输入" clearable v-model="v2">
        <template #suffix>Suffix</template>
    </x-input>
    <div class="split"></div>
    <x-input placeholder="请输入" clearable v-model="v3">
        <template #suffix>
            <Search />
        </template>
    </x-input>
</template>