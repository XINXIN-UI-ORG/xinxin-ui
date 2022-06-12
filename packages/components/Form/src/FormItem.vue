<script lang="ts">
import { defineComponent, ref } from "vue";
import { generateClassName } from "@xinxin-ui/utils";
import { formItemProps } from "./formItem";
import { useFormItem } from "./formItem";

export default defineComponent({
    name: "x-form-item",
    props: formItemProps,
    setup() {
        let gcn = generateClassName('form-item');
        let labelRef = ref<HTMLLabelElement>();
        useFormItem(labelRef);

        return {
            gcn,
            labelRef,
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
        <label
            :class="gcn.e('label')"
            ref="labelRef"
        >
            {{ label }}
        </label>
        <div :class="gcn.e('input')">
            <slot />
        </div>
    </div>
</template>
<style lang="stylus" scoped src="../style/formItem.styl" />