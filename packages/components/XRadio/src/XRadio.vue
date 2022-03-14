<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { radioProps, radioEmit, radioGather } from "./XRadio";
import { generateClassName } from "../../../utils"

export default defineComponent({
    name: 'x-radio',
    props: radioProps,
    emits: radioEmit,
    inheritAttrs: false,
    setup(props, { emit, slots }) {
        let gcn = generateClassName("radio");
        let radioInputRef = ref<HTMLInputElement>();
        let { checkValue, blurEvent, focusEvent } = radioGather(props, emit, radioInputRef);
        return {
            radioInputRef,
            checkValue,
            description: computed(() => slots.description),
            gcn,
            blurEvent,
            focusEvent,
        };
    },
});
</script>
<template>
    <label :class="[
        gcn.base(),
        gcn.is('disabled', disabled),
        gcn.is('checked', checkValue),
        gcn.is('card', card),
    ]">
        <div :class="[
            gcn.e('icon'),
        ]">
            <input
                type="radio"
                :class="[
                    gcn.e('icon', 'input')
                ]"
                ref="radioInputRef"
                :value="value"
                :name="name"
                v-model="checkValue"
                :disabled="disabled"
                @blur="blurEvent"
                @focus="focusEvent"
            />
            <div
                :class="[
                    gcn.e('icon', 'check'),
                ]"
            ></div>
        </div>
        <div :class="[
            gcn.e('description')
        ]">
            <span :class="[
                gcn.e('description', 'label')
            ]">
                <slot></slot>
            </span>
            <span
                :class="[
                    gcn.e('description', 'second-text')
                ]"
                v-if="description">
                <slot name="description"></slot>
            </span>
        </div>
    </label>
</template>
<style lang="stylus" scoped>
@import '../../../theme-chalk/variable.styl';

.x-radio
    display inline-flex
    cursor pointer
    box-sizing border-box
    .x-radio__icon
        flex 0 0 16px
        height 16px
        width 16px
        position relative
        .x-radio__icon__input
            position absolute
            top 0
            left 0
            margin 0
            width 100%
            height 100%
            cursor pointer
            opacity 0
            z-index 2
            &:hover
                ~ .x-radio__icon__check
                    transition all .3s
                    border-color $base_theme_color
        .x-radio__icon__check
            border 1px solid #1c1f2359
            height 100%
            width 100%
            position relative
            z-index 1
            border-radius 50%
            background-color #fff
    .x-radio__description
        user-select none
        margin-left 8px
        font-size 14px
        display flex
        flex-direction column
        .x-radio__description__label
            margin-top -1px
        .x-radio__description__second-text
            color #1c1f2399
.x-radio-card
    padding 10px
    border-radius 4px
    border 1px solid transparent
    &:hover
        background-color #f4f5f5    
    .x-radio__description__label
        font-weight bolder
.x-radio-checked
    &:hover
        background transparent
    .x-radio__icon__check
        transition all .5s
        background-color $base_theme_color !important
        border-color $base_theme_color !important
        &::before
            content ''
            height 7px
            width 7px
            position absolute
            top 50%
            left 50%
            transform translate(-50%, -50%)
            border-radius 50%
            background-color #fff
    &.x-radio-card
        background-color $base_theme_color_opacity
        border-color $base_theme_color
.x-radio-disabled
    cursor not-allowed
    .x-radio__icon
        cursor not-allowed
        .x-radio__icon__input
            cursor not-allowed
            &:hover
                ~ .x-radio__icon__check
                    border-color $base_theme_disabled_border-color
        .x-radio__icon__check
            background-color $base_theme_disabled_bg-color !important
            border-color $base_theme_disabled_border-color !important
    .x-radio__description
        color $base_theme_disabled_color
        .x-radio__description__second-text
            color $base_theme_disabled_second-text-color
</style>
