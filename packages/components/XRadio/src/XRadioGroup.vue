<script lang="ts">
import { defineComponent, ref } from "vue";
import { generateClassName } from "@xinxin-ui/utils";
import { radioGroupProps, radioGroupEmits, radioGroupGather } from "./XRadioGroup";

export default defineComponent({
    name: "x-radio-group",
    props: radioGroupProps,
    emits: radioGroupEmits,
    inheritAttrs: false,
    setup(props, {emit}) {
        let gcn = generateClassName('radio-group');
        let {} = radioGroupGather(props, emit);
        return {
            gcn,
        };
    }
});
</script>
<template>
    <section
        :class="[
            gcn.base(),
            gcn.is('disabled', disabled),
        ]">
        <slot></slot>
    </section>
</template>
<style lang="stylus" scoped>
.x-radio-group
    display inline-block
    :deep(.x-radio)
        margin-right 16px
    :deep(.x-radio:last-child)
        margin-right 0
    :deep(.x-radio-card)
        margin-right 0
        margin-bottom 10px
    :deep(.x-radio-card:last-child)
        margin-bottom 0
    :deep(.x-radio-button:first-child)
        padding-left 4px
    :deep(.x-radio-button:first-child)
        border-radius 4px 0 0 4px
    :deep(.x-radio-button:last-child)
        border-radius 0 4px 4px 0
.x-radio-group
    cursor not-allowed
</style>
