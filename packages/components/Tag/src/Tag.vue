<script lang="ts">
import { defineComponent } from "vue";
import { tagProps, useTag, tagEmits } from "./tag";
import { generateClassName } from "@xinxin-ui/utils";
import { Close } from "@xinxin-ui/xinxin-icons";

export default defineComponent({
    name: "x-tag",
    props: tagProps,
    emits: tagEmits,
    setup(props, { emit }) {
        let gcn = generateClassName("tag");
        let { autoVisible, tagDisappear } = useTag(props, emit);
        return {
            gcn,
            autoVisible,
            tagDisappear,
        };
    },
    components: {
        Close,
    },
});
</script>
<template>
    <transition
        name="fade"
    >
        <span
            :class="[
                gcn.base(),
                gcn.bm(type),
                gcn.bm(theme),
                gcn.bm(size),
                gcn.is('round', round),
            ]"
            v-if="visible && autoVisible"
        >
            <span
                :class="[
                    gcn.e('content'),
                ]"
            >
                <slot />
            </span>
            <i
                :class="[
                    gcn.e('close'),
                ]"
                v-if="closeable"
                @click="tagDisappear"
            >
                <close />
            </i>
        </span>
    </transition>
</template>
<style scoped lang="stylus" src="../style/tag.styl" />