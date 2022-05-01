<script lang="ts">
import { defineComponent, computed } from 'vue';
import { generateClassName } from "@xinxin-ui/utils";
import { selectProps, useSelect } from "./select";
import XInput from "../../XInput";
import Popover from "../../Popover";
import { Select, Checked } from "@xinxin-ui/xinxin-icons";

export default defineComponent({
    name: "x-select",
    props: selectProps,
    setup(props) {
        let gcn = generateClassName("select");
        let { showSelectIcon } = useSelect(props);
        return {
            gcn,
            suffixIcon: computed(() => {
                return Select;
            }),
            showSelectIcon,
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
    >
        <Popover
            trigger="click"
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