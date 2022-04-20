<script lang="ts">
import { defineComponent } from 'vue';
import { generateClassName } from "@xinxin-ui/utils";
import { selectProps } from "./select";
import * as XinXinIcons from "@xinxin-ui/xinxin-icons";

export default defineComponent({
    name: "x-select",
    props: selectProps,
    setup() {
        let gcn = generateClassName("select");
        return {
            gcn,
        };
    },
    components: {
        ...XinXinIcons,
    },
})
</script>
<template>
    <div
        :class="[
            gcn.base(),
            gcn.bm(size),
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
            >
                {{item.label}}
            </div>
        </div>
        <div
            :class="[
                gcn.e('icon'),
            ]"
        >
            <component :is="suffix" />
        </div>
    </div>
</template>
<style lang="stylus" scoped src="../style/select.styl"></style>