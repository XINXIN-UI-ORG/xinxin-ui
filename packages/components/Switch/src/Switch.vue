<script lang="ts">
import { defineComponent, ref } from "vue";
import { generateClassName } from "@xinxin-ui/utils";
import { switchProps, useSwitch } from "./switch";

export default defineComponent({
    name: 'x-switch',
    props: switchProps,
    setup(props, { emit }) {
        let gcn = generateClassName('switch');
        let activeRef = ref<HTMLDivElement>();
        let inactiveRef = ref<HTMLDivElement>();
        let {
            modelValue,
            displayStyle,
            activeStyle,
            inactiveStyle,
        } = useSwitch(props, emit, activeRef, inactiveRef);

        return {
            gcn,
            activeRef,
            inactiveRef,
            modelValue,
            displayStyle,
            activeStyle,
            inactiveStyle,
        };
    },
});
</script>
<template>
    <label
        :class="[
            gcn.base(),
            gcn.bm(size),
            gcn.is('select', modelValue),
            gcn.is('disabled', disabled),
        ]"
        :style="(displayStyle as any)"
    >
        <input
            :class="[
                gcn.e('input'),
            ]"
            type="checkbox"
            v-model="modelValue"
            :disabled="disabled"
        />
        <div
            :class="gcn.e('display')"
        >
            <div
                :class="gcn.e('active')"
                ref="activeRef"
                :style="activeStyle"
            >
                {{ activeText }}
            </div>
            <div
                :class="[
                    gcn.e('action'),
                ]"
            >
            </div>
            <div
                :class="gcn.e('inactive')"
                ref="inactiveRef"
                :style="inactiveStyle"
            >
                {{ inactiveText }}
            </div>
        </div>
    </label>
</template>
<style scoped lang="stylus" src="../style/switch.styl" />