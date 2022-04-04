<script lang="ts">
import { computed, defineComponent } from 'vue';
import { MenuType, MenuListType } from "./Menu.typing";
import { menuList } from "../component";

export default defineComponent({
    props: {
        componentName: {
            type: String
        },
    },
    setup(props) {
        
        return {
            menuList: computed<MenuListType[]>(() => {
                menuList.forEach(item => {
                    if (item.name?.toLowerCase() === props.componentName) {
                        item.active = true;
                    } else {
                        item.active = false;
                    }
                });
                return menuList;
            }),
            MenuType,
        };
    }
})
</script>
<template>
<n-scrollbar style="max-height: 100%">
    <div class="menu">
        <template v-for="item in menuList">
            <div class="menu__category" :key="item.id" v-if="item.type === MenuType.category">
                <component :is="item.icon" class="icon" />
                <span class="content">{{ item.content }}</span>
                <span class="count">({{ item.size }})</span>
            </div>
            <div
                :class="[
                    'menu__link',
                    item.active ? 'active' : ''
                ]"
                :key="item.id"
                v-if="item.type === MenuType.link"
            >
                <router-link :to="{name: 'componentItem', params: { componentName: item.name.toLowerCase() }}">
                    <span class="content">{{ item.content }}</span>
                    <span class="name">{{ item.name }}</span>
                </router-link>
            </div>
        </template>
    </div>
</n-scrollbar>
</template>
<style lang="stylus" scoped>
.menu
    padding 10px 5px
    .menu__category
        color #aaa
        padding 10px 10px
        user-select none
        .icon
            width 22px
            height 22px
            color #aaa
            vertical-align sub
        .content
            padding-left 2px
    .menu__link
        margin 5px 0
        user-select none
        cursor pointer
        border-radius 4px
        transition all .5s
        a
            display block
            height 100%
            width 100%
            padding 10px 0 10px 26px
            transition all .5s
            .content
                margin-right 5px
            .name
                transition all .5s
                color #8c7c92
        &:hover
            background-color #f3f3f5
        &.active
            background-color #f5a31f2e
            a
                color #f5a31f
                .name
                    color #f5a31f
</style>
