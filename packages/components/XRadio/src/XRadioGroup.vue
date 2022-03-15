<script lang="ts">
import { defineComponent, ref } from "vue";
import { generateClassName } from "@xinxin-ui/utils";
import { radioGroupProps, radioGroupEmits, radioGroupGather } from "./XRadioGroup";

export default defineComponent({
    name: "x-radio-group",
    props: radioGroupProps,
    emits: radioGroupEmits,
    setup(props, {emit}) {
        let radioGroupRef = ref<HTMLTableSectionElement>();
        let gcn = generateClassName('radio-group');
        let {} = radioGroupGather(props, emit, radioGroupRef);
        return {
            gcn,
            radioGroupRef,
        };
    }
});
</script>
<template>
    <section
        ref="radioGroupRef"
        :class="[
            gcn.base(),
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
</style>
