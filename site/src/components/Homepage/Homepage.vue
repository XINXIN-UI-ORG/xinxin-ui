<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from "vue-router";
import { Components, Document } from "@xinxin-ui/xinxin-icons";

export default defineComponent({
    setup() {
        const router = useRouter();
        return {
            toInstall() {
                router.push({
                    name: "install"
                });
            },
            toComponent() {
                router.push({
                    name: "component"
                });
            }
        };
    },
    components: {
        Components,
        Document
    }
})
</script>

<template>
    <x-scrollbar max-height="calc(100vh - 60px)">
        <div class="homepage__introduce">
            <div class="homepage__introduce__title">
                XinXin UI
            </div>
            <div class="homepage__introduce__desc">
                一款基于Vue3和Typescript开发的PC端UI组件库
            </div>
        </div>
        <div class="homepage__bg">
            <img src="../../assets/homepage.svg" alt="Homepage">
        </div>
        <div class="homepage__links">
            <x-button type="success" size="large" @click="toInstall">
                <template #pre-icon>
                    <Document />
                </template>
                下载使用
            </x-button>
            <x-button type="warning" size="large" @click="toComponent">
                <template #pre-icon>
                    <Components />
                </template>
                组件使用
            </x-button>
        </div>
        <footer class="homepage__footer">
            Looks like I have to put something here, but I don't want to. \(^o^)/~
        </footer>
    </x-scrollbar>
</template>
<style lang="stylus" scoped>
.homepage__introduce
    margin 50px 0 20px
    text-align center
    font-size 18px
    .homepage__introduce__title
        font-size 36px
        font-weight bolder
    .homepage__introduce__desc
        color #606266
.homepage__bg
    width 800px
    margin 0 auto
    img
        width 100%
.homepage__links
    width 300px
    margin 50px auto 30px
    display flex
    justify-content space-between
.homepage__footer
    height 60px
    line-height 60px
    text-align center
    background-color #fafafc
    border-top 1px solid #efeff5
    user-select none
</style>
