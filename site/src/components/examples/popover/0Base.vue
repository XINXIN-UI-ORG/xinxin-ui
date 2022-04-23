<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
    setup() {
        let containerRef = ref<HTMLDivElement>();
        let placement = ref<string>("right");
        onMounted(() => {
            containerRef.value!.scrollTop = 220;
            containerRef.value!.scrollLeft = 230;
        })
        return {
            containerRef,
            placement
        };
    }
})
</script>
<template>
    <div :class="classes.container">
        <div :class="classes.left">
            <x-button dashed type="info" @click="placement = 'left-start'">Left Start</x-button>
            <x-button dashed type="success" @click="placement = 'left'">Left</x-button>
            <x-button dashed type="warning" @click="placement = 'left-end'">Left End</x-button>
        </div>
        <div :class="classes.display">
            <div :class="classes.top">
                <x-button tertiary type="info" @click="placement = 'top-start'">Top Start</x-button>
                <x-button tertiary type="success" @click="placement = 'top'">Top</x-button>
                <x-button tertiary type="warning" @click="placement = 'top-end'">Top End</x-button>
            </div>
            <x-scrollbar
                :class="classes.wrapper"
                ref="containerRef"
                max-height="350"
            >
            <!-- <div :class="classes.wrapper" ref="containerRef"> -->
                <x-popover
                    :placement="placement"
                    :boundary="containerRef"
                >
                    <img :class="classes.context" src="/logo.png" alt="NO IMG" />
                    <template #content>
                        <p>XinXin UI</p>
                        <p>A vue3+ts ui repository</p>
                        <p>npm install xinxin-ui</p>
                    </template>
                </x-popover>
            <!-- </div> -->
            </x-scrollbar>
            <div :class="classes.top">
                <x-button ghost type="info" @click="placement = 'bottom-start'">Bottom Start</x-button>
                <x-button ghost type="success" @click="placement = 'bottom'">Bottom</x-button>
                <x-button ghost type="warning" @click="placement = 'bottom-end'">Bottom End</x-button>
            </div>
        </div>
        <div :class="classes.left">
            <x-button secondary type="info" @click="placement = 'right-start'">Right Start</x-button>
            <x-button secondary type="success" @click="placement = 'right'">Right</x-button>
            <x-button secondary type="warning" @click="placement = 'right-end'">Right End</x-button>
        </div>
    </div>
</template>
<style module="classes" lang="stylus">
.wrapper
    border 2px dashed rgb(255, 107, 129)
    background-color rgb(40, 30, 54)
    border-radius 10px
    position relative !important
.container
    display flex
    width 100%
.left
    display flex
    flex-direction column
    justify-content space-around
    margin 0 5px
.top
    display flex
    justify-content space-around
    margin 5px 0
.display
    flex 1
    overflow hidden
.context
    margin 350px 400px !important
    width 60px
    height 60px
    cursor pointer
</style>
<style lang="stylus" scoped>
.x-button
    margin: 0 !important
</style>
