<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        return {
            value1: ref([]),
            value2: ref([]),
            options: [
                {
                    label: "襄阳歌-李白",
                    value: "1"
                },
                {
                    label: "采莲曲-李白",
                    value: "2"
                },
                {
                    label: "石鼓歌-韩愈",
                    value: "3",
                    disabled: true,
                },
                {
                    label: "客中行-李白",
                    value: "4"
                },
                {
                    label: "听蜀僧浚弹琴-李白",
                    value: "5"
                },
                {
                    label: "金陵酒肆留别-李白",
                    value: "6"
                },
                {
                    label: "子夜四时歌·夏歌-李白",
                    value: "7"
                },
                {
                    label: "子夜四时歌·冬歌-李白",
                    value: "8"
                },
                {
                    label: "赠孟浩然-李白",
                    value: "9"
                },
                {
                    label: "杂诗-李白",
                    value: "10"
                },
                {
                    label: "怨情-李白",
                    value: "11"
                },
                {
                    label: "夜泊牛渚怀古-李白",
                    value: "12"
                },
                {
                    label: "陌上桑-李白",
                    value: "13"
                },
            ],
        };
    },
})
</script>
<template>
    <x-select
        :options="options"
        placeholder="未开启过滤"
        v-model="value1"
        multiple
    >
    </x-select>
    <div class="split"></div>
    <x-select
        :options="options"
        placeholder="开启过滤"
        v-model="value2"
        multiple
        filterable
    >
    </x-select>
</template>