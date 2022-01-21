<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue';

export default defineComponent({
    name: "x-button-group",
    props: {
        direction: {
            type: String as PropType<"horizontal" | "vertical">,
            default: "horizontal"
        }
    },
    setup(props) {
        let groupStyle = reactive({
            flexDirection: props.direction === "horizontal" ? "row" : "column",
            firstBorderTopRightRadius: props.direction === "horizontal" ? "0" : undefined,
            firstBorderBottomLeftRadius: props.direction === "horizontal" ? undefined : "0",
            firstBorderBottomRightRadius: "0",
            lastBorderTopLeftRadius: "0",
            lastBorderTopRightRadius: props.direction === "horizontal" ? undefined : "0",
            lastBorderBottomLeftRadius: props.direction === "horizontal" ? "0" : undefined,
        });
        return {
            groupStyle,
        };
    },
})
</script>
<template>
    <div class="x-button-group">
        <slot>
            <span>放点东西吧~</span>
        </slot>
    </div>
</template>
<style lang="stylus" scoped>
.x-button-group
    display inline-flex
    flex-direction v-bind('groupStyle.flexDirection')
    :deep(.x-button)
        &:not(:first-child):not(:last-child)
            border-radius 0
        &:first-child
            border-top-right-radius v-bind("groupStyle.firstBorderTopRightRadius")
            border-bottom-left-radius v-bind("groupStyle.firstBorderBottomLeftRadius")
            border-bottom-right-radius v-bind("groupStyle.firstBorderBottomRightRadius")
        &:last-child
            border-top-left-radius v-bind("groupStyle.lastBorderTopLeftRadius")
            border-top-right-radius v-bind("groupStyle.lastBorderTopRightRadius")
            border-bottom-left-radius v-bind("groupStyle.lastBorderBottomLeftRadius")
</style>