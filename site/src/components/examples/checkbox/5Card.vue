<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        let groupList = ref(['2']);
        return {
            groupList
        };
    },
})
</script>
<template>
    <x-checkbox-group v-model="groupList">
        <x-checkbox card value="0">
            望天门山
            <template #description>
                <p>天门中断楚江开，碧水东流至此回。</p>
                <p>两岸青山相对出，孤帆一片日边来。</p>
            </template>
        </x-checkbox>
        <x-checkbox card value="1">
            峨眉山月歌
            <template #description>
                <p>峨眉山月半轮秋，影入平羌江水流。</p>
                <p>夜发清溪向三峡，思君不见下渝州。</p>
            </template>
        </x-checkbox>
        <x-checkbox card disabled value="2">
            送友人
            <template #description>
                <p>青山横北郭，白水绕东城。</p>
                <p>此地一为别，孤蓬万里征。</p>
                <p>浮云游子意，落日故人情。</p>
                <p>挥手自兹去，萧萧班马鸣。</p>
            </template>
        </x-checkbox>
    </x-checkbox-group>
</template>