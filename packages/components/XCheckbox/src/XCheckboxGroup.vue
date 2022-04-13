<script lang="ts">
import { defineComponent } from 'vue';
import { generateClassName } from "@xinxin-ui/utils";
import { checkboxGroupProps, useCheckboxGroup, checkboxGroupEmits } from "./CheckboxGroup";

export default defineComponent({
    name: "x-checkbox-group",
    props: checkboxGroupProps,
    emits: checkboxGroupEmits,
    setup(props, { emit }) {
        let gcn = generateClassName("checkbox-group");
        useCheckboxGroup(props, emit);
        return {
            gcn,
        };
    },
})
</script>
<template>
    <section
        :class="[
            gcn.base(),
            gcn.is('disabled', disabled),
        ]"
    >
        <slot></slot>
    </section>
</template>
<style lang="stylus" scoped>
.x-checkbox-group
    display inline-block
    :deep(.x-checkbox)
        margin-right 16px
        &:last-child
            margin-right 0
    :deep(.x-checkbox-card)
        margin-right 0
        margin-bottom 10px
        &:last-child
            margin-bottom 0
    :deep(.x-checkbox-button:first-child)
        border-radius 4px 0 0 4px
        padding-left 4px
    :deep(.x-checkbox-button:last-child)
        border-radius 0 4px 4px 0
.x-checkbox-group-disabled
    cursor not-allowed
</style>
