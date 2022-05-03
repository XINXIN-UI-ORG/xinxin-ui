<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { generateClassName } from "@xinxin-ui/utils";
import { selectProps, useSelect, selectEmits } from "./select";
import XInput from "../../XInput";
import Popover from "../../Popover";
import { Checked, ErrorMessage, Select } from "@xinxin-ui/xinxin-icons";

export default defineComponent({
    name: "x-select",
    props: selectProps,
    emits: selectEmits,
    setup(props, { emit }) {
        let gcn = generateClassName("select");
        let {
            selectValues,
            visible,
            optionClick,
            selectLabels,
            suffixIconShow,
            showClearBtn,
            closeClearBtn,
            clearContent,
        } = useSelect(props, emit);
        return {
            gcn,
            suffixIconShow,
            selectValues,
            visible,
            optionClick,
            selectLabels,
            stopBlur(e: Event) {
                e.preventDefault();
                return false;
            },
            showClearBtn,
            closeClearBtn,
            clearContent,
        };
    },
    components: {
        XInput,
        Popover,
        Checked,
        ErrorMessage,
        Select,
    },
})
</script>
<template>
    <div
        :class="[
            gcn.base(),
            gcn.bm(size),
            gcn.is('block', block),
            gcn.is('disabled', disabled),
        ]"
        @click="!disabled && (visible = !visible)"
        @mouseenter="showClearBtn"
        @mouseleave="closeClearBtn"
    >
        <Popover
            :show="visible"
            placement="bottom"
            :show-arrow="false"
            _block
            :_extend-width="2"
            style="padding: 0;"
        >
            <template #default>
                <x-input
                    :class="[
                        gcn.e('input'),
                    ]"
                    :placeholder="placeholder"
                    :block="block"
                    v-model="selectLabels[0]"
                    :_cursor="!disabled"
                    readonly
                    :mode="size"
                    :disabled="disabled"
                >
                    <template #suffix>
                        <Select 
                            :class="[
                                gcn.e('input', 'icon'),
                                gcn.middle('input', 'icon').is('open', visible),
                            ]"
                            v-if="suffixIconShow === 0"
                        />
                        <error-message
                            v-else-if="suffixIconShow === 1"
                            :class="[
                                gcn.e('input', 'clear')
                            ]"
                            @click="clearContent($event)"
                        />
                    </template>
                </x-input>
            </template>
            <template #content>
                <div
                    :class="[
                        gcn.e('options'),
                    ]"
                    @mousedown="stopBlur"
                    @mouseup="stopBlur"
                >
                    <div
                        :class="[
                            gcn.e('options', 'item'),
                            gcn.middle('options', 'item').is('selected', selectValues.indexOf(item.value) !== -1 && !item.disabled),
                            gcn.middle('options', 'item').is('disabled', item.disabled),
                        ]"
                        v-for="item in options"
                        :key="item.value"
                        @click="optionClick(item.value, item.disabled)"
                    >
                        <div :class="[
                            gcn.e('options', 'item', 'select'),
                        ]">
                            <Checked v-if="selectValues.length > 0" />
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