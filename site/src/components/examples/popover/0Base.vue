<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
    setup() {
        let containerRef = ref<HTMLDivElement>();
        onMounted(() => {
            containerRef.value!.scrollTop = 220;
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
            placement="right-end"
            :boundary="containerRef"
        >
            <x-button>点击弹出</x-button>
            <template #content>
                <p>Lately did you ever feel the pain In</p>
                <p>Lately did you ever feel the pain In</p>
                <p>Lately did you ever feel the pain In</p>
                <p>Lately did you ever feel the pain In</p>
                <p>Lately did you ever feel the pain In</p>
            </template>
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
    margin: 400px 0 400px 10px !important
</style>