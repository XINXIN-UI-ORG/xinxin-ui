<template>
    <x-top>
        <Arrow />
    </x-top>
    <x-top bottom="100" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Arrow } from "xinxin-icons";

export default defineComponent({
    setup() {
        
    },
    components: {
        Arrow
    },
})
</script>

