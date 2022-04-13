<script lang="ts">
import { defineComponent } from 'vue';
import { generateClassName } from "@xinxin-ui/utils";
import { checkboxProps, checkboxEmits, checkboxGather } from "./XCheckbox";

export default defineComponent({
    name: "x-checkbox-button",
    props: checkboxProps,
    emits: checkboxEmits,
    setup(props, { emit }) {
        let gcn = generateClassName("checkbox-button");
        let { checked, name, disabled, size } = checkboxGather(props, emit);
        return {
            gcn,
            checked,
            name,
            disabled,
            size,
        };
    },
})
</script>
<template>
    <label
        :class="[
            gcn.base(),
            gcn.is('checked', checked),
            gcn.is('disabled', disabled),
            gcn.bm(size),
        ]"
    >
        <input
            type="checkbox"
            :class="[
                gcn.e('input')
            ]"
            :value="value"
            v-model="checked"
            :disabled="disabled"
            :name="name"
        >
        <section
            :class="[
                gcn.e('select'),
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

.x-checkbox-button
    position relative
    display inline-flex
    background-color #f4f5f5
    cursor pointer
    font-weight 600
    font-size 14px
    color #474a4d
    padding 4px 4px 4px 0
    user-select none
    .x-checkbox-button__input
        position absolute
        inset 0 0 0 0
        cursor pointer
        opacity 0
        z-index -1
    .x-checkbox-button__select
        border-radius 4px
        &:hover
            background-color #e2e4e4
.x-checkbox-button-small
    .x-checkbox-button__select
        padding 2px 12px
        font-size 12px
        border-radius 2px
.x-checkbox-button-normal
    .x-checkbox-button__select
        padding 4px 16px
.x-checkbox-button-large
    .x-checkbox-button__select
        padding 6px 20px
.x-checkbox-button-checked
    .x-checkbox-button__select
        background-color #fff
        color $base_theme_color
        &:hover
            background-color #fff
.x-checkbox-button-disabled
    cursor not-allowed
    opacity .5
    .x-checkbox-button__select
        &:hover
            background-color #f4f5f5
    &.x-checkbox-button-checked
        .x-checkbox-button__select
            &:hover
                background-color #fff
</style>