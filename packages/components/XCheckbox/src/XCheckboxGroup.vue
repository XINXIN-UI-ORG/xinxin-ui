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
        ]"
    >
        <slot></slot>
    </section>
</template>
<style lang="stylus" scoped>
.x-checkbox-group
    :deep(.x-checkbox)
        margin-right 16px
        &:last-child
            margin-right 0
</style>
