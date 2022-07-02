<script lang="ts">
import { defineComponent, ref } from "vue";
import { generateClassName } from "@xinxin-ui/utils";
import { switchProps, useSwitch } from "./switch";
import { Load } from "@xinxin-ui/xinxin-icons";

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
            formItem,
        } = useSwitch(props, emit, activeRef, inactiveRef);

        return {
            gcn,
            activeRef,
            inactiveRef,
            modelValue,
            displayStyle,
            activeStyle,
            inactiveStyle,
            formItem,
        };
    },
    components: {
        Load,
    },
});
</script>
<template>
    <label
        :class="[
            gcn.base(),
            gcn.bm(formItem.size),
            gcn.is('select', modelValue),
            gcn.is('disabled', disabled),
            gcn.is('loading', loading),
            gcn.is('active', !disabled && !loading),
        ]"
        :style="(displayStyle as any)"
    >
        <input
            :class="[
                gcn.e('input'),
            ]"
            type="checkbox"
            v-model="modelValue"
            :disabled="disabled || loading"
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
                <slot
                    name="icon"
                    v-if="!loading"
                />
                <load
                    :class="gcn.e('action', 'load')"
                    v-if="loading"
                />
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