<script lang="ts">
import { defineComponent, ref } from 'vue';
import { ChevronRight20Regular, ChevronLeft20Regular } from "@vicons/fluent";

export default defineComponent({
    setup() {
        let toggle = ref(true);
        let menuRef = ref<HTMLDivElement>();
        return {
            toggle,
            menuRef,
            toogleUp() {
                toggle.value = !toggle.value;
                toggle.value
                    ? menuRef.value!.classList.remove("active")
                    : menuRef.value!.classList.add("active");
            }
        };
    },
    components: {
        ChevronRight20Regular,
        ChevronLeft20Regular
    },
})
</script>

<template>
<div class="component">
    <div class="component__menu" ref="menuRef">
        <router-view name="componentMenu" class="component__menu__component"></router-view>
        <div class="component__menu__toogle" @click="toogleUp">
            <component :is="toggle ? 'ChevronLeft20Regular' : 'ChevronRight20Regular'" />
        </div>
    </div>
    <router-view v-slot="{ Component }" class="component__content">
        <keep-alive :max="10">
            <n-loading-bar-provider>
                <component :is="Component" />
            </n-loading-bar-provider>
        </keep-alive>
    </router-view>
    <router-view name="componentAction" class="component__action"></router-view>
</div>
</template>
<style lang="stylus" scoped>
.component
    display flex
    position relative
    .component__menu
        flex 0 0 280px
        width 280px
        transition all .3s
        position relative
        border-right 1px solid #efeff5
        height calc(100vh - 60px)
        background-color #fff
        .component__menu__component
            overflow hidden
        .component__menu__toogle
            position absolute
            transition all .3s
            right calc(0% - 13px)
            top 30%
            box-shadow 0 0 6px #d8d9db
            border-radius 255px
            width 26px
            height 26px
            cursor pointer
            background-color #fff
            z-index 1
            svg
                margin 3px
                color #909399
                height 20px
                width 20px
        &.active
            margin-left -280px
            .component__menu__toogle
                right calc(0% - 36px)
    .component__content
        flex 1
    .component__action
        flex 0 0 200px
        width 200px
        overflow hidden
        transition all .3s

@media (max-width: 1400px)
    .component__menu
        margin-left -280px
        position fixed !important
        z-index 1
        .component__menu__toogle
            right calc(0% - 36px) !important
        &.active
            margin-left 0 !important
            .component__menu__toogle
                right calc(0% - 13px) !important
@media (max-width: 1200px)
    .component__action
        flex 0 0 0 !important
        width 0 !important
    
</style>
