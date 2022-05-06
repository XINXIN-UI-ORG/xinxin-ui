<script lang="ts">
import { defineComponent, ref } from "vue";
import { SelectTypeEnum } from "xinxin-ui";

export default defineComponent({
    setup() {
        return {
            value: ref("1"),
            multipleValue: ref([]),
            multipleValueCollapse: ref([]),
            options: [
                {
                    type: SelectTypeEnum.GROUP,
                    label: "李白诗集",
                    value: "libai",
                    children: [
                        {
                            label: "襄阳歌",
                            value: "1",
                        },
                        {
                            label: "采莲曲",
                            value: "2",
                        },
                        {
                            label: "客中行",
                            value: "3",
                        },
                    ],
                },
                {
                    type: SelectTypeEnum.GROUP,
                    label: "韩愈诗集",
                    value: "hanyu",
                    children: [
                        {
                            label: "石鼓歌",
                            value: "4",
                        },
                        {
                            label: "听颖师弹琴",
                            value: "5"
                        },
                        {
                            label: "谒衡岳庙遂宿岳寺题门楼",
                            value: "6"
                        },
                        {
                            label: "八月十五夜赠张功曹",
                            value: "7"
                        },
                        {
                            label: "调张籍",
                            value: "8"
                        },
                    ],
                },
                {
                    type: SelectTypeEnum.GROUP,
                    label: "柳宗元诗集",
                    value: "liuzongyuan",
                    children: [
                        {
                            label: "江雪",
                            value: "9",
                        },
                        {
                            label: "晨诣超师院读禅经",
                            value: "10"
                        },
                        {
                            label: "登柳州城楼寄漳汀封连四州",
                            value: "11"
                        },
                        {
                            label: "溪居",
                            value: "12"
                        },
                        {
                            label: "饮酒",
                            value: "13"
                        },
                    ],
                },
            ],
        };
    },
})
</script>
<template>
    <x-select
        :options="options"
        placeholder="Select"
        v-model="value"
        filterable
    >
    </x-select>
    <div class="split"></div>
    <x-select
        :options="options"
        placeholder="Select"
        v-model="multipleValue"
        multiple
        filterable
    >
    </x-select>
    <div class="split"></div>
    <x-select
        :options="options"
        placeholder="Select"
        v-model="multipleValueCollapse"
        multiple
        filterable
        collapse-tags
        collapse-tags-tooltip
    >
    </x-select>
</template>