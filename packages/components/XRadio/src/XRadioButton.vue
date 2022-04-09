<script lang="ts">
import { defineComponent, ref } from 'vue';
import { generateClassName } from "@xinxin-ui/utils";
import { radioGather, radioEmit, radioProps } from "./XRadio";

export default defineComponent({
    name: "x-radio-button",
    props: radioProps,
    emits: radioEmit,
    setup(props, { emit }) {
        let gcn = generateClassName("radio-button");
        let radioInputRef = ref<HTMLInputElement>();
        let { checkValue, blurEvent, focusEvent, inputName, disabled, size } = radioGather(props, emit, radioInputRef);
        return {
            gcn,
            radioInputRef,
            inputName,
            checkValue,
            disabled,
            blurEvent,
            focusEvent,
            size,
        };
    },
})
</script>
<template>
    <label
        :class="[
            gcn.base(),
            gcn.is('checked', checkValue === value),
            gcn.is('disabled', disabled),
            gcn.bm(size),
        ]"
    >
        <input
            type="radio"
                :class="[
                    gcn.e('input')
                ]"
                ref="radioInputRef"
                :value="value"
                :name="inputName"
                v-model="checkValue"
                :disabled="disabled"
                @blur="blurEvent"
                @focus="focusEvent"
        >
        <section
            :class="[
                gcn.e('select'),
            ]"
        >
            <slot>
                {{ value }}
            </slot>
        </section>
    </label>
</template>
<style lang="stylus" scoped>
@import '../../../theme-chalk/variable.styl';

.x-radio-button
    position relative
    display inline-flex
    background-color #f4f5f5
    cursor pointer
    font-weight 600
    font-size 14px
    color #474a4d
    padding 4px 4px 4px 0
    user-select none
    .x-radio-button__input
        position absolute
        inset 0 0 0 0
        cursor pointer
        opacity 0
        z-index -1
    .x-radio-button__select
        border-radius 4px
        &:hover
            background-color #e2e4e4
.x-radio-button-small
    .x-radio-button__select
        padding 2px 12px
        font-size 12px
        border-radius 2px
.x-radio-button-normal
    .x-radio-button__select
        padding 4px 16px
.x-radio-button-large
    .x-radio-button__select
        padding 6px 20px
.x-radio-button-checked
    .x-radio-button__select
        background-color #fff
        color $base_theme_color
        &:hover
            background-color #fff
.x-radio-button-disabled
    cursor not-allowed
    opacity .5
    .x-radio-button__select
        &:hover
            background-color #f4f5f5
    &.x-radio-button-checked
        .x-radio-button__select
            &:hover
                background-color #fff
</style>