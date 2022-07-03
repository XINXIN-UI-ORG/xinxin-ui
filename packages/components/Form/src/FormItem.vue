<script lang="ts">
import { defineComponent, ref } from "vue";
import type { Ref } from "vue";
import { generateClassName } from "@xinxin-ui/utils";
import { formItemProps, FormItemProps } from "./formItem";
import { useFormItem } from "./formItem";

export default defineComponent({
    name: "x-form-item",
    props: formItemProps,
    setup(props: FormItemProps) {
        let gcn = generateClassName('form-item');
        let labelRef = ref<HTMLLabelElement>();
        let { required } = useFormItem(labelRef as Ref<HTMLLabelElement>, props);

        return {
            gcn,
            labelRef,
            required,
        };
    },
});
</script>
<template>
    <label
        :class="[
            gcn.base(),
        ]"
    >
        <div
            :class="gcn.e('label')"
            ref="labelRef"
        >
            {{ label }}
            <span v-if="required" :class="gcn.e('label', 'required')">*</span>
        </div>
        <div :class="gcn.e('input')">
            <slot />
        </div>
    </label>
</template>
<style lang="stylus" scoped src="../style/formItem.styl" />