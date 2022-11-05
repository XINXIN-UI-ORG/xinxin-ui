<script lang="ts">
import { defineComponent } from "vue";
import { generateClassName } from "@xinxin-ui/utils";
import { useForm, formProps, FormProps } from "./form";

export default defineComponent({
    name: "x-form",
    props: formProps,
    setup(props: FormProps) {
        const gcn = generateClassName('form');
        const { validate } = useForm(props);

        return {
            gcn,
            /**
             * export
             */
            validate,
        };
    },
});
</script>
<template>
    <div
        :class="[
            gcn.base(),
            gcn.bm(labelPosition),
            gcn.bm(size),
        ]"
    >
        <slot></slot>
    </div>
</template>
<style scoped lang="stylus" src="../style/form.styl" />