<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        let radioValue = ref("0");
        return {
            radioValue
        };
    },
})
</script>
<template>
    <x-radio v-model="radioValue" value="0" card>
        《早发白帝城》
        <template #description>
            <p>朝辞白帝彩云间，</p>
            <p>千里江陵一日还。</p>
            <p>两岸猿声啼不住，</p>
            <p>轻舟已过万重山。</p>
        </template>
    </x-radio>
    <br>
    <x-radio v-model="radioValue" value="1" card>
        《黄鹤楼送孟浩然之广陵》
        <template #description>
            <p>故人西辞黄鹤楼，</p>
            <p>烟花三月下扬州。</p>
            <p>孤帆远影碧空尽，</p>
            <p>唯见长江天际流。</p>
        </template>
    </x-radio>
</template>