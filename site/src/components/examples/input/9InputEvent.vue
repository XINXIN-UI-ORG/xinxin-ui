<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        let showRef = ref<HTMLDivElement>();
        return {
            showRef,
            inputChange(value: string) {
                showRef.value!.textContent = value;
            },
        };
    },
})
</script>
<template>
    <x-input placeholder="onInput事件" @onInputChange="inputChange" block />
    <div class="show" ref="showRef"></div>
</template>
<style scoped>
.show {
    margin: 10px 0 0 10px;
}
</style>