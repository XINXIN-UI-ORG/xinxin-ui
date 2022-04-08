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
    <x-input placeholder="请输入" block clearable />
    <x-input placeholder="请输入" block clearable>
        <template #suffix>Suffix</template>
    </x-input>
    <x-input placeholder="请输入" block clearable>
        <template #suffix>
            <Search />
        </template>
    </x-input>
</template>