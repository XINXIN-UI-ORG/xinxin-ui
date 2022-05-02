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
    <div class="split"></div>
    <x-input placeholder="请输入" block clearable>
        <template #suffix>Suffix</template>
    </x-input>
    <div class="split"></div>
    <x-input placeholder="请输入" block clearable>
        <template #suffix>
            <Search />
        </template>
    </x-input>
</template>