<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
    setup() {
        let scrollbarRef = ref();
        onMounted(() => {
            scrollbarRef.value.scrollTo({
                top: 100,
                left: 120,
            });
        });
        return {
            scrollbarRef,
            scrollByClick() {
                scrollbarRef.value.scrollBy({
                    top: 100,
                    behavior: 'smooth'
                }); 
            },
        };
    }
});
</script>
<template>
    <x-button @click="scrollByClick">scrollBy滚动</x-button>
    <x-scrollbar
        max-height="350"
        ref="scrollbarRef"
        horizontal
    >
        <img :class="classes.context" src="/logo.png" alt="NO IMG" />
    </x-scrollbar>
</template>
<style module="classes" lang="stylus" scoped>
.context
    margin 350px 400px !important
    width 60px
    height 60px
    cursor pointer
</style>