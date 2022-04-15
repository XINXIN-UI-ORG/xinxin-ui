<script lang="ts">
import { defineComponent } from 'vue';
import { generateClassName } from "@xinxin-ui/utils";
import { selectProps } from "./select";

export default defineComponent({
    name: "x-select",
    props: selectProps,
    setup() {
        let gcn = generateClassName("select");
        return {
            gcn,
        };
    },
})
</script>
<template>
    <div
        :class="[
            gcn.base(),
        ]"
    >
        <div
            :class="[
                gcn.e('options'),
            ]"
        >
            <div
                :class="[
                    gcn.e('options', 'option'),
                ]"
                v-for="item in options"
                :key="item.value"
            >

            </div>
        </div>
    </div>
</template>