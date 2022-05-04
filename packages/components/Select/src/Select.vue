<script lang="ts">
import { defineComponent, ref } from 'vue';
import { generateClassName } from "@xinxin-ui/utils";
import { selectProps, useSelect, selectEmits } from "./select";
import XInput from "../../XInput";
import Popover from "../../Popover";
import { Checked, ErrorMessage, DownSelect, NoData } from "@xinxin-ui/xinxin-icons";

export default defineComponent({
    name: "x-select",
    props: selectProps,
    emits: selectEmits,
    setup(props, { emit }) {
        let gcn = generateClassName("select");
        let singleSelectRef = ref<InstanceType<typeof XInput>>();
        let {
            selectValues,
            visible,
            readonly,
            inputValue,
            optionClick,
            selectLabels,
            suffixIconShow,
            showClearBtn,
            closeClearBtn,
            clearContent,
            optionList,
            selectToogle,
        } = useSelect(props, emit);
        return {
            gcn,
            singleSelectRef,
            suffixIconShow,
            selectValues,
            visible,
            readonly,
            inputValue,
            optionClick,
            selectToogle,
            selectLabels,
            stopBlur(e: Event) {
                e.preventDefault();
                return false;
            },
            showClearBtn,
            closeClearBtn,
            clearContent,
            optionList,
        };
    },
    components: {
        XInput,
        Popover,
        Checked,
        ErrorMessage,
        DownSelect,
        NoData,
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
        @click.stop="selectToogle"
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
                    :placeholder="selectLabels[0] || placeholder"
                    :block="block"
                    v-model="inputValue"
                    :_cursor="!disabled"
                    :readonly="readonly"
                    :mode="size"
                    :disabled="disabled"
                    ref="singleSelectRef"
                >
                    <template #suffix>
                        <down-select 
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
                    @click.stop
                    v-if="optionList.length > 0"
                >
                    <div
                        :class="[
                            gcn.e('options', 'item'),
                            gcn.middle('options', 'item').is('selected', selectValues.indexOf(item.value) !== -1 && !item.disabled),
                            gcn.middle('options', 'item').is('disabled', item.disabled),
                        ]"
                        v-for="item in optionList"
                        :key="item.value"
                        @click="optionClick(item.value, item.disabled)"
                    >
                        <div :class="[
                            gcn.e('options', 'item', 'select'),
                        ]">
                            <checked v-if="selectValues.length > 0" />
                        </div>
                        <div :class="[
                            gcn.e('options', 'item', 'label'),
                        ]">
                            {{ item.label }}
                        </div>
                    </div>
                </div>
                <div
                    :class="[
                        gcn.e('no-data'),
                    ]"
                    @mousedown="stopBlur"
                    @mouseup="stopBlur"
                    @click.stop
                    v-else
                >
                    <div :class="gcn.e('no-data', 'icon')">
                        <no-data />
                    </div>
                    <div :class="gcn.e('no-data', 'text')">暂无数据</div>
                </div>
            </template>
        </Popover>
    </div>
</template>
<style lang="stylus" scoped src="../style/select.styl"></style>