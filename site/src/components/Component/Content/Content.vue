<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { menuList } from "../Menu/Menu";
import { MenuListType } from "../Menu/Menu.typing";
import { Compose24Regular } from "@vicons/fluent";
import { useContent } from "./content";

export default defineComponent({
    props: {
        componentName: {
            type: String
        },
    },
    setup(props) {
        const { content } = useContent(() => props.componentName!);
        return {
            currentMenuItem: computed<MenuListType | undefined>(() => {
                return menuList.find(item => item.name?.toLowerCase() === props.componentName);
            }),
            content,
        };
    },
    components: {
        Compose24Regular,
    },
})
</script>
<template>
    <x-scrollbar
        max-height="calc(100vh - 60px)"
        class="scroll-content"
    >
        <div class="content">
            <div class="title">
                <span class="name">{{ currentMenuItem.content }}</span>
                <span class="component">{{ currentMenuItem.name.replace("-", " ") }}</span>
                <Compose24Regular class="icon" />
            </div>
            <component :is="content" />
        </div>
        <x-top listen-element=".scroll-content .x-scrollbar__container__content" />
    </x-scrollbar>
</template>
<style lang="stylus" scoped>
.content
    margin 0 50px
    padding-bottom 100px
    .title
        margin-top 30px
        font-size 32px
        font-weight 500
        .name
            margin-right 10px
        .component
            margin-right 10px
        .icon
            width 20px
            height 20px
            color #909399
            vertical-align middle
    .content__wrap
        margin-top 20px
        font-size 16px
        .content__wrap__desc
            color #aaa
            margin-bottom 15px
</style>