<template>
    <x-top>
        <arrow />
    </x-top>
    <x-top bottom="100" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { arrow } from "xinxin-icons";

export default defineComponent({
    setup() {
        
    },
    components: {
        arrow
    },
})
</script>

