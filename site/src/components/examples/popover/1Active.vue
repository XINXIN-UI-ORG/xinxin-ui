<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        let visible = ref<boolean>(false);
        return {
            visible,
        };
    }
});
</script>
<template>
    <x-popover
        trigger="click"
        content="故人西辞黄鹤楼，烟花三月下扬州。"
    >
        <x-button plain>Click to active</x-button>
    </x-popover>
    <x-popover
        trigger="hover"
        content="孤帆远影碧空尽，唯见长江天际流。"
    >
        <x-button plain>Hover to active</x-button>
    </x-popover>
    <x-popover
        trigger="hover"
        content="凤凰台上凤凰游，凤去台空江自流。"
        :ignore-content="true"
    >
        <x-button plain>Hover to active(ignore content)</x-button>
    </x-popover>
    <x-popover
        trigger="focus"
        content="杨花落尽子规啼，闻道龙标过五溪。"
    >
        <x-button plain>Focus to active</x-button>
    </x-popover>
    <x-popover
        trigger="contextmenu"
        content="吴宫花草埋幽径，晋代衣冠成古丘。"
    >
        <x-button plain>Contextmenu to active</x-button>
    </x-popover>
    <x-popover
        :show="visible"
        content="我寄愁心与明月，随君直到夜郎西。"
    >
        <x-button plain @click="visible = !visible">Manual to active</x-button>
    </x-popover>
</template>