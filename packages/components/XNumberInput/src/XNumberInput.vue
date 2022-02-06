<script lang="ts">
import { computed, defineComponent } from "vue";
import XInput from "../../XInput";
import { Up } from "xinxin-icons";

export default defineComponent({
    name: "x-number-input",
    inheritAttrs: false,
    props: {
        numberButton: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, { attrs }) {
        return {
            numberInputClassList: computed(() => [
                "x-number-input",
                "x-number-input-" + (<string>attrs.mode ?? "normal")
            ]),
        };
    },
    components: {
        XInput,
        Up,
    },
});
</script>
<template>
    <div :class="numberInputClassList">
        <XInput v-bind="$attrs" type="number" />
        <div class="x-number-input__button" v-if="numberButton">
            <div
                class="x-number-input__button__top x-number-input__button__half"
            >
                <Up />
            </div>
            <div
                class="x-number-input__button__bottom x-number-input__button__half"
            >
                <Up />
            </div>
        </div>
    </div>
</template>
<style lang="stylus" scoped>
.x-number-input
    display inline-flex
    .x-number-input__button
        border 1px solid #e0e0e6
        margin-left 5px
        margin-top -1px
        border-radius 3px
        cursor pointer
        display flex
        flex-direction column
        .x-number-input__button__half
            height 50%
            padding 0 2px
            display flex
            align-items center
            &:hover
                background-color #f4f5f5
            &:active
                background-color #eceded
            .asa-icon
                color #888a8c
                width 8px
                height 8px
        .x-number-input__button__bottom
            .asa-icon
                transform rotateX(180deg)
.x-number-input-small
    height 30px
.x-number-input-normal
    height 34px
.x-number-input-large
    height 38px

</style>
