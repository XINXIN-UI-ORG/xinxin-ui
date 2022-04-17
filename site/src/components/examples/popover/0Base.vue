<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
    setup() {
        let containerRef = ref<HTMLDivElement>();
        onMounted(() => {
            containerRef.value!.scrollTop = 520;
        })
        return {
            containerRef
        };
    }
})
</script>
<template>
    <div :class="classes.wrapper" ref="containerRef">
        <x-popover
            content="Lately did you ever feel the pain In the morning rain as it soaks it to the bone"
            placement="bottom"
            :boundary="containerRef"
        >
            <x-button>点击弹出</x-button>
        </x-popover>
    </div>
</template>
<style module="classes" lang="stylus">
.wrapper
    border 2px dashed rgb(255, 107, 129)
    background-color rgb(40, 30, 54)
    border-radius 10px
    overflow-y scroll
    overscroll-behavior contain
    position relative !important
    height 350px
</style>
<style lang="stylus" scoped>
.x-button
    margin: 400px 0 200px 10px !important
</style>