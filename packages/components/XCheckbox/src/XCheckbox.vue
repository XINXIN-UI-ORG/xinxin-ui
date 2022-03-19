<script lang="ts">
import { defineComponent } from 'vue';
import { checkboxProps } from "./XCheckbox";
import { generateClassName } from "@xinxin-ui/utils";

export default defineComponent({
    name: "x-checkbox",
    props: checkboxProps,
    setup() {
        const gcn = generateClassName("checkbox");

        return {
            gcn,
        };
    },
})
</script>
<template>
    <label
        :class="[
            gcn.base(),
        ]"
    >
        <input
            :class="[
                gcn.e('input'),
            ]"
            type="checkbox"
        />
        <section
            :class="[
                gcn.e('selector'),
            ]"
        ></section>
        <section
            :class="[
                gcn.e('label'),
            ]"
        >
            <slot>
                {{label}}
            </slot>
        </section>
    </label>
</template>
<style lang="stylus" scoped>
@import '../../../theme-chalk/variable.styl';

.x-checkbox
    display inline-block
    align-items center
    cursor pointer
    position relative
    &:hover
        .x-checkbox__selector
            border-color $base_theme_color
    .x-checkbox__input
        position absolute
        inset 0 0 0 0
        z-index -1
        opacity 0
    .x-checkbox__selector
        display inline-block
        vertical-align text-bottom
        width 16px
        height 16px
        box-sizing border-box
        border-radius 3px
        border 1px solid #b0b1b2
        margin-right 5px
    .x-checkbox__label
        display inline-block
        vertical-align middle
        font-size 14px
</style>
