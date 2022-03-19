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
.x-checkbox
    display inline-flex
    cursor pointer
</style>
