<script lang="ts">
import { defineComponent } from "vue";
import { generateClassName } from "@xinxin-ui/utils";
import { formItemProps } from "./formItem";

export default defineComponent({
    name: "x-form-item",
    props: formItemProps,
    setup() {
        let gcn = generateClassName('form-item');

        return {
            gcn,
        };
    },
});
</script>
<template>
    <div
        :class="[
            gcn.base(),
        ]"
    >
        <label :class="gcn.e('label')">{{ label }}</label>
        <div :class="gcn.e('input')">
            <slot />
        </div>
    </div>
</template>
<style lang="stylus" scoped src="../style/formItem.styl" />