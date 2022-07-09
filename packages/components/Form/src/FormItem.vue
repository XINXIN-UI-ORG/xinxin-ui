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
        let { required, errorMsg } = useFormItem(labelRef as Ref<HTMLLabelElement>, props);

        return {
            gcn,
            labelRef,
            required,
            errorMsg,
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
        <div
            :class="gcn.e('label')"
            ref="labelRef"
        >
            {{ label }}
            <span v-if="required" :class="gcn.e('label', 'required')">*</span>
        </div>
        <div :class="gcn.e('input')">
            <slot />
            <transition name="error">
                <span
                    v-if="errorMsg.length > 0"
                    :class="gcn.e('input', 'error')"
                >
                    {{ errorMsg }}
                </span>
            </transition>
        </div>
    </div>
</template>
<style lang="stylus" scoped src="../style/formItem.styl" />