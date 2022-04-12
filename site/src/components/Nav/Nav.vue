<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { BookmarkAdd24Regular, AlignBottom32Filled } from "@vicons/fluent";

export default defineComponent({
    setup() {
        let searchValue = ref('');
        let options = computed(() => {
            return ['测试测试1', '测试测试2', '测试测试3', '测试测试4']
            .filter(item => item.indexOf(searchValue.value) !== -1)
            .map(item => ({
                label: item,
                value: item
            }));
        });

        document.title = "xinxin-ui | 首页";

        return {
            searchValue,
            options,
            appName: import.meta.env.VITE_APP_TITLE,
        };
    },
    components: {
        BookmarkAdd24Regular,
        AlignBottom32Filled,
    },
})
</script>

<template>
    <div class="xinxin-nav">
        <div class="xinxin-nav__logo">
            <router-link class="xinxin-nav__logo__a" :to="{name: 'homepage'}">
                <img src="../../assets/logo.png" alt="XINXIN-UI" class="xinxin-nav__logo__img">
                <div class="xinxin-nav__logo__text">{{ appName }}</div>
            </router-link>
        </div>
        <div class="xinxin-nav__nav">
            <ul class="xinxin-nav__nav__list">
                <li>
                    <n-auto-complete
                        v-model:value="searchValue"
                        :options="options"
                        placeholder="搜索组件"
                        style="width: 260px"
                    />
                </li>
                <li>
                    <router-link active-class="active" :to="{name: 'install'}">
                        <div class="xinxin-nav__nav__list__icon">
                            <BookmarkAdd24Regular />
                        </div>
                        <div class="xinxin-nav__nav__list__text">下载使用</div>
                    </router-link>
                </li>
                <li>
                    <router-link active-class="active" :to="{name: 'component'}">
                        <div class="xinxin-nav__nav__list__icon">
                            <AlignBottom32Filled />
                        </div>
                        <span class="xinxin-nav__nav__list__text">组件</span>
                    </router-link>
                </li>
                <li>
                    <a href="https://github.com/XINXIN-UI-ORG/xinxin-ui" target="_blank">
                        <img src="../../assets/github.svg" alt="NO IMG">
                        GitHub
                    </a>
                </li>
                <li>
                    <a href="https://github.com/Traeric" target="_blank">
                        <img src="https://avatars.githubusercontent.com/u/34062997?s=40&v=4" alt="NO IMG">
                        Author
                    </a>
                </li>
                <li class="version">
                    Version: 1.0.0
                </li>
            </ul>
        </div>
    </div>
</template>
<style lang="stylus" scoped>
.xinxin-nav
    height 60px
    border-bottom 1px solid #dcdfe6
    box-sizing border-box
    padding 0 20px
    .xinxin-nav__logo
        float left
        height 100%
        .xinxin-nav__logo__a
            height 100%
            display flex
            align-items center
            user-select none
            .xinxin-nav__logo__img
                height 40px
                width 40px
            .xinxin-nav__logo__text
                margin-left 10px
                font-size 22px
                font-weight 500
    .xinxin-nav__nav
        float right
        .xinxin-nav__nav__list
            &::after
                content ''
                display block
                clear both
            li
                float left
                height 60px
                line-height 60px
                margin 0 15px
                font-size 14px
                cursor pointer
                user-select none
                &:hover
                    .xinxin-nav__nav__list__icon
                        svg
                            color #f5a31f
                    .xinxin-nav__nav__list__text
                        color #f5a31f
                a:hover
                    color #f5a31f
                a.active
                    border-color #f5a31f
                    .xinxin-nav__nav__list__icon
                        svg
                            color #f5a31f
                    .xinxin-nav__nav__list__text
                        color #f5a31f
                a
                    border-bottom 2px solid transparent
                    box-sizing border-box
                    height 60px
                    display block
                    img
                        width 24px
                        height 24px
                        border-radius 50%
                        vertical-align -9%
                .xinxin-nav__nav__list__icon
                    width 25px
                    float left
                    line-height 70px
                    svg
                        height 25px
                        width 25px
                        color #606266
                .xinxin-nav__nav__list__text
                    float right
                    margin-left 5px
                    color #303133
            .version
                color #aaa

@media (max-width: 1100px)
    .xinxin-nav__nav__list
        li
            display none
        li:nth-of-type(1)
            display block
</style>