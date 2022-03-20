<script lang="ts">
import { defineComponent } from 'vue';
import { checkboxProps } from "./XCheckbox";
import { generateClassName } from "@xinxin-ui/utils";
import { checkboxGather } from "./XCheckbox";
import { Checked } from "xinxin-icons";

export default defineComponent({
    name: "x-checkbox",
    props: checkboxProps,
    setup(props, { emit }) {
        const gcn = generateClassName("checkbox");
        const { checked } = checkboxGather(props, emit);
        return {
            gcn,
            checked,
        };
    },
    components: {
        Checked,
    },
})
</script>
<template>
    <label
        :class="[
            gcn.base(),
            gcn.is('checked', checked),
            gcn.is('disabled', disabled),
        ]"
    >
        <input
            :class="[
                gcn.e('input'),
            ]"
            type="checkbox"
            :value="value"
            v-model="checked"
            :name="name"
            :disabled="disabled"
        />
        <section
            :class="[
                gcn.e('selector'),
            ]"
        >
            <Checked
                :class="[
                    gcn.e('selector', 'icons'),
                ]"
            />
        </section>
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
    user-select none
    &:hover
        .x-checkbox__selector
            border-color $base_theme_color
    .x-checkbox__input
        position absolute
        inset 0 0 0 0
        z-index -1
        opacity 0
    .x-checkbox__selector
        display inline-flex
        align-items center
        justify-content center
        vertical-align text-bottom
        width 16px
        height 16px
        box-sizing border-box
        border-radius 3px
        border 1px solid #b0b1b2
        margin-right 5px
        transition all .2s
        .x-checkbox__selector__icons
            color #fff
            transition all .2s
            width 14px
            height 0
    .x-checkbox__label
        display inline-block
        vertical-align middle
        font-size 14px
.x-checkbox-checked
    .x-checkbox__selector
        background-color $base_theme_color
        border-color $base_theme_color
        .x-checkbox__selector__icons
            height 14px
.x-checkbox-disabled
    opacity .3
    cursor not-allowed
    .x-checkbox__selector
        border-color #b0b1b2 !important
        background-color $base_theme_disabled_bg-color !important
        .x-checkbox__selector__icons
            color #b0b1b2
    &:hover
        .x-checkbox__selector
            border-color #b0b1b2
</style>
