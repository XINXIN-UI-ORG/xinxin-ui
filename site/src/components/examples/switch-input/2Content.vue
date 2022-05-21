<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        return {
            value: ref<boolean>(false),
        };
    },
});
</script>
<template>
    <x-switch
        v-model="value"
        inactive-text="我本楚狂人，凤歌笑孔丘。"
        active-text="手持绿玉杖，朝别黄鹤楼。"
    >
    </x-switch>
</template>