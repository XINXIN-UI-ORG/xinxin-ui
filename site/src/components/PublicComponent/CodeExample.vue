<script lang="ts">
import { CopySelect20Regular, Code20Regular, ArrowClockwise20Regular } from "@vicons/fluent";
import { computed, nextTick, ref, defineComponent } from "vue";
import hljs from 'highlight.js/lib/core';
import xml from 'highlight.js/lib/languages/xml';
import javascript from 'highlight.js/lib/languages/javascript';
import { copyToClipBoard } from "../../utils";

export default defineComponent({
    props: {
        code: String,
        title: String,
        codeVNode: Object,
        codeDesc: String
    },
    setup(props) {
        hljs.registerLanguage('xml', xml);
        hljs.registerLanguage('javascript', javascript);
        const codeRef = ref();
        let codeHeight = ref(0);
        let showComponent = ref(true);

        return {
            hljs,
            codeRef,
            showComponent,
            codeStyle: computed(() => ({
                padding: '0',
                height: `${codeHeight.value}px`,
                borderTop: codeHeight.value === 0 ? 'none' : '1px solid #efeff5',
                transition: 'height .5s',
                overflow: 'hidden',
                backgroundColor: '#fafafc',
            })),
            codeToggle() {
                throttle(() => {
                    if (codeHeight.value === 0) {
                        codeHeight.value = Math.min(codeRef.value.offsetHeight, 500);
                    } else {
                        codeHeight.value = 0;
                    }
                })();
            },
            copyCode() {
                throttle(async () => {
                    copyToClipBoard(props.code!);
                })();
            },
            refreshComponent() {
                showComponent.value = false;
                nextTick(() => showComponent.value = true);
            },
        };
    },
    components: {
        CopySelect20Regular,
        Code20Regular,
        ArrowClockwise20Regular,
    },
});


/**
 * 节流
 */
function throttle(callback: Function) {
    let flag = true;
    return async function () {
        if (!flag) {
            return;
        }
        flag = false;
        callback();
        setTimeout(() => {
            flag = true;
        }, 500);
    };
}
</script>
<template>
    <n-card :title="title" class="code-card"
        ref="codeCardRef"
        :footer-style="codeStyle"
        content-style="overflow: hidden;"
    >
        <template #header-extra>
            <x-popover
                content="刷新"
                trigger="hover"
                theme="dark"
            >
                <n-button text style="font-size: 0.9rem; margin-right: .5rem;" @click="refreshComponent">
                    <n-icon>
                        <ArrowClockwise20Regular />
                    </n-icon>
                </n-button>
            </x-popover>
            <x-popover
                content="复制代码"
                trigger="hover"
                theme="dark"
            >
                <n-button text style="font-size: 0.9rem; margin-right: .5rem;" @click="copyCode">
                    <n-icon>
                        <CopySelect20Regular />
                    </n-icon>
                </n-button>
            </x-popover>
            <x-popover
                content="查看源码"
                trigger="hover"
                theme="dark"
            >
                <n-button text style="font-size: 0.9rem;" @click="codeToggle">
                    <n-icon>
                        <Code20Regular />
                    </n-icon>
                </n-button>
            </x-popover>
        </template>
        <!-- 组件描述 -->
        <p v-html="codeDesc" class="component-desc"></p>
        <div class="show">
            <component :is="codeVNode" v-if="showComponent" />
        </div>
        <template #footer>
            <x-scrollbar max-height="500">
                <n-config-provider :hljs="hljs">
                    <div class="code" ref="codeRef">
                        <n-code :code="code" language="xml"/>
                    </div>
                </n-config-provider>
            </x-scrollbar>
        </template>
    </n-card>
</template>
<style lang="stylus" scoped>
.code
    padding 20px 24px
.code-card
    margin-bottom 1rem
.component-desc
    margin-bottom 10px
.show
    :deep(.split)
        height 10px
    :deep(button)
        margin 10px 10px 0 0
    :deep(.x-button-group)
        margin 10px 10px 0 0
        button
            margin 0
    :deep(.x-number-input)
        margin-top 10px
        .x-input
            margin-top 0 !important
:deep(.site-tag)
    background-color #f4f4f8
    border-radius 4px
    padding 2px 4px
</style>
