<script lang="ts">
import { defineComponent, onBeforeUpdate, onMounted } from 'vue';
import { generateClassName } from "@xinxin-ui/utils";
import { checkboxGroupProps } from "./XCheckboxGroup";

export default defineComponent({
    name: "x-checkbox-group",
    props: checkboxGroupProps,
    setup(props, { slots }) {
        let gcn = generateClassName("checkbox-group");
        const subSlots = slots.default?.();
        subSlots![0].props!.label = "wwwww";
        return {
            gcn,
            subSlots,
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
        <!-- <template v-for="item in subSlots">
            <component :is="item" />
        </template> -->
        <component :is="subSlots![0]" />
    </section>
</template>
<style lang="stylus" scoped>
.x-checkbox-group
    :deep(.x-checkbox)
        margin-right 16px
        &:last-child
            margin-right 0
</style>
