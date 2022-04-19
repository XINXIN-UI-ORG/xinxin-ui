<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        let visible = ref<boolean>(false);
        return {
            visible,
        };
    }
});
</script>
<template>
    <x-popover
        trigger="click"
        content="A vue UI repository!"
    >
        <x-button plain type="success">Click to active</x-button>
    </x-popover>
    <x-popover
        trigger="hover"
        content="A vue UI repository!"
    >
        <x-button plain type="warning">Hover to active</x-button>
    </x-popover>
    <x-popover
        trigger="focus"
        content="A vue UI repository!"
    >
        <x-button plain type="warning">Focus to active</x-button>
    </x-popover>
    <x-popover
        :show="visible"
        content="A vue UI repository!"
    >
        <x-button plain type="error" @click="visible = !visible">Manual to active</x-button>
    </x-popover>
</template>