<script lang="ts">
import { defineComponent, computed } from 'vue';
import { generateClassName } from "@xinxin-ui/utils";
import { selectProps, useSelect, selectEmits } from "./select";
import XInput from "../../XInput";
import Popover from "../../Popover";
import { Select, Checked } from "@xinxin-ui/xinxin-icons";

export default defineComponent({
    name: "x-select",
    props: selectProps,
    emits: selectEmits,
    setup(props, { emit }) {
        let gcn = generateClassName("select");
        let { showSelectIcon, visible, optionClick } = useSelect(props, emit);
        return {
            gcn,
            suffixIcon: computed(() => {
                let component = Select;
                return component;
            }),
            showSelectIcon,
            visible,
            optionClick,
        };
    },
    components: {
        XInput,
        Popover,
        Checked,
    },
})
</script>
<template>
    <div
        :class="[
            gcn.base(),
            gcn.bm(size),
        ]"
        @click="visible = !visible"
    >
        <Popover
            :show="visible"
            placement="bottom"
            :show-arrow="false"
            _block
            :_extend-width="2"
            style="padding: 6px 0;"
        >
            <x-input
                :class="[
                    gcn.e('input'),
                ]"
                :placeholder="placeholder"
                :block="block"
                _cursor
                readonly
            >
                <template #suffix>
                    <component 
                        :class="[
                            gcn.e('input', 'icon'),
                            gcn.middle('input', 'icon').is('open', visible),
                        ]"
                        :is="suffixIcon"
                    />
                </template>
            </x-input>
            <template #content>
                <div
                    :class="[
                        gcn.e('options'),
                    ]"
                >
                    <div
                        :class="[
                            gcn.e('options', 'item'),
                            gcn.middle('options', 'item').is('selected', item.value === modelValue),
                        ]"
                        v-for="item in options"
                        :key="item.value"
                        @click="optionClick(item.value)"
                    >
                        <div :class="[
                            gcn.e('options', 'item', 'select'),
                        ]">
                            <Checked v-if="showSelectIcon" />
                        </div>
                        <div :class="[
                            gcn.e('options', 'item', 'label'),
                        ]">
                            {{ item.label }}
                        </div>
                    </div>
                </div>
            </template>
        </Popover>
    </div>
</template>
<style lang="stylus" scoped src="../style/select.styl"></style>