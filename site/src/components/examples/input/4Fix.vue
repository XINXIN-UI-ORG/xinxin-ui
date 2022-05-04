<script lang="ts">
import { defineComponent, ref } from "vue";
import { Search } from "@xinxin-ui/xinxin-icons";

export default defineComponent({
    setup() {
        return {
            v1: ref(""),
            v2: ref(""),
            v3: ref(""),
            v4: ref(""),
        };
    },
    components: {
        Search
    },
})
</script>
<template>
    <x-input placeholder="请输入" type="text" v-model="v1">
        <template #prefix>Prefix</template>
    </x-input>
    <div class="split"></div>
    <x-input placeholder="请输入" type="text" v-model="v2">
        <template #suffix>Suffix</template>
    </x-input>
    <div class="split"></div>
    <x-input placeholder="请输入" v-model="v3">
        <template #prefix>
            <Search />
        </template>
    </x-input>
    <div class="split"></div>
    <x-input placeholder="请输入" v-model="v4">
        <template #suffix>
            <Search />
        </template>
    </x-input>
</template>