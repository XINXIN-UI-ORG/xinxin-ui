<script lang="ts">
import { ref, defineComponent } from "vue";
import { XMessage } from "xinxin-ui";

export default defineComponent({
    setup() {
        let visible = ref<boolean>(true);
        return {
            preventClose(callback: Function) {
                XMessage("点击这里不会触发关闭");
                callback(false);
            },
            visible,
        };
    },
});
</script>
<template>
    <x-tag closeable>乌夜啼</x-tag>

    <span class="separator"></span>
    <x-tag type="info" closeable>梁甫吟</x-tag>
    
    <span class="separator"></span>
    <x-tag type="success" closeable>战城南</x-tag>
    
    <span class="separator"></span>
    <x-tag type="warning" closeable>北风行</x-tag>
    
    <span class="separator"></span>
    <x-tag type="error" closeable>襄阳歌</x-tag>

    <div class="split"></div>

    <x-tag closeable @close="preventClose" v-model:visible="visible">乌夜啼</x-tag>

    <span class="separator"></span>
    <x-tag type="info" closeable @close="preventClose" v-model:visible="visible">梁甫吟</x-tag>
    
    <span class="separator"></span>
    <x-tag type="success" closeable @close="preventClose" v-model:visible="visible">战城南</x-tag>
    
    <span class="separator"></span>
    <x-tag type="warning" closeable @close="preventClose" v-model:visible="visible">北风行</x-tag>
    
    <span class="separator"></span>
    <x-tag type="error" closeable @close="preventClose" v-model:visible="visible">襄阳歌</x-tag>

    <div class="split"></div>
    <x-button @click="visible = false">手动关闭</x-button>
</template>
