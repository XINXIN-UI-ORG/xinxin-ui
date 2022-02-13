<script lang="ts">
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
    name: "x-radio",
    props: {
        modelValue: {
            type: [Number, String, Boolean],
            default: undefined,
        },
        value: {
            type: [Number, String, Boolean],
            default: undefined,
        },
        name: String,
    },
    emits: {
        "update:modelValue": null,
    },
    setup(props, { emit }) {
        let radioInputRef = ref<HTMLInputElement>();
        return {
            radioInputRef,
            checked: computed({
                get: () =>
                    props.modelValue !== undefined &&
                    props.value !== undefined &&
                    props.modelValue === props.value,
                set: value => {
                    if (value) {
                        emit("update:modelValue", props.value);
                    }
                },
            }),
        };
    },
});
</script>
<template>
    <label class="x-radio">
        <div class="x-radio__icon">
            <input
                type="radio"
                class="x-radio__icon_input"
                ref="radioInputRef"
                :name="name"
                :checked="checked"
                v-model="checked"
            />
            <div :class="['x-radio__icon__check', checked && 'x-radio__icon__checked']"></div>
        </div>
        <div class="x-radio__description">fdfds</div>
    </label>
</template>
<style lang="stylus" scoped>
@import '../../../theme-chalk/variable.styl';

.x-radio
    display inline-flex
    cursor pointer
    .x-radio__icon
        height 16px
        width 16px
        position relative
        .x-radio__icon_input
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
        .x-radio__icon__checked
            transition all .5s
            background-color $base_theme_color
            border-color $base_theme_color
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
</style>
