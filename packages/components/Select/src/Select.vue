<script lang="ts">
import { defineComponent, ref } from 'vue';
import { generateClassName } from "@xinxin-ui/utils";
import { selectProps, useSelect, selectEmits } from "./select";
import XInput from "../../XInput";
import Popover from "../../Popover";
import Tag from "../../Tag";
import { ErrorMessage, DownSelect } from "@xinxin-ui/xinxin-icons";
import SelectMenu from "./SelectMenu.vue";

export default defineComponent({
    name: "x-select",
    props: selectProps,
    emits: selectEmits,
    setup(props, { emit }) {
        let gcn = generateClassName("select");
        let popoverRef = ref<InstanceType<typeof Popover>>();
        let collapseTagPopoverRef = ref<InstanceType<typeof Popover>>();
        let {
            selectValues,
            selectOptions,
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
            multipleFilterFlag,
            multipleFlag,
            placeholder,
            changeSelect,
            selectMenuScroll,
            containerStyle,
            menuStyle,
        } = useSelect(props, emit, popoverRef, collapseTagPopoverRef);
        return {
            gcn,
            popoverRef,
            collapseTagPopoverRef,
            selectOptions,
            suffixIconShow,
            selectValues,
            visible,
            readonly,
            inputValue,
            optionClick,
            selectToogle,
            selectLabels,
            showClearBtn,
            closeClearBtn,
            clearContent,
            optionList,
            multipleFilterFlag,
            multipleFlag,
            placeholder,
            changeSelect,
            focus() {
                emit("focus", props.modelValue as any);
            },
            blur() {
                emit("blur", props.modelValue as any);
            },
            selectMenuScroll,
            containerStyle,
            menuStyle,
        };
    },
    components: {
        XInput,
        Popover,
        ErrorMessage,
        DownSelect,
        Tag,
        SelectMenu,
    },
});
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
            ref="popoverRef"
            :max-height="260"
            @popover-scroll="selectMenuScroll"
        >
            <template #default>
                <x-input
                    :class="[
                        gcn.e('input'),
                    ]"
                    :placeholder="placeholder"
                    :block="block"
                    v-model="inputValue"
                    :_cursor="!disabled"
                    :readonly="readonly"
                    :size="size"
                    :disabled="disabled"
                    ref="singleSelectRef"
                    :_hidden-input="multipleFilterFlag"
                    @onInputFocus="focus"
                    @onInputBlur="blur"
                >
                    <template #prefix>
                        <template
                            v-if="multipleFlag"
                        >
                            <!-- 基础多选 -->
                            <div
                                :class="[
                                    gcn.e('input', 'tag-list'),
                                ]"
                                v-if="!collapseTags"
                            >
                                <tag
                                    v-for="item in selectOptions"
                                    closeable
                                    type="warning"
                                    @close="optionClick($event, item.value, false)"
                                    :auto-close="false"
                                >
                                    {{item.label}}
                                </tag>
                            </div>
                            <!-- 带折叠 -->
                            <div
                                v-if="collapseTags && !collapseTagsTooltip"
                                :class="[
                                    gcn.e('input', 'tag-list'),
                                ]"
                            >
                                <tag
                                    closeable
                                    type="warning"
                                    @close="optionClick($event, selectOptions[0].value, false)"
                                    :auto-close="false"
                                >
                                    {{selectOptions[0].label}}
                                </tag>
                                <tag
                                    v-if="selectOptions.length > 1"
                                    type="warning"
                                    :auto-close="false"
                                >
                                    +{{selectOptions.length - 1}}
                                </tag>
                            </div>
                            <!-- 折叠带popover -->
                            <div
                                v-if="collapseTags && collapseTagsTooltip"
                                :class="[
                                    gcn.e('input', 'tag-list'),
                                ]"
                            >
                                <tag
                                    closeable
                                    type="warning"
                                    @close="optionClick($event, selectOptions[0].value, false)"
                                    :auto-close="false"
                                >
                                    {{selectOptions[0].label}}
                                </tag>
                                <popover
                                    placement="bottom"
                                    trigger="hover"
                                    v-if="selectOptions.length > 1"
                                    ref="collapseTagPopoverRef"
                                    style="max-width: 300px"
                                    :max-height="260"
                                >
                                    <tag
                                        v-if="selectOptions.length > 1"
                                        type="warning"
                                        :auto-close="false"
                                    >
                                        +{{selectOptions.length - 1}}
                                    </tag>
                                    <template #content>
                                        <tag
                                            v-for="item in selectOptions.slice(1)"
                                            closeable
                                            type="warning"
                                            @close="optionClick($event, item.value, false)"
                                            :auto-close="false"
                                            style="margin: 1.5px 3px 1.5px 0;"
                                        >
                                            {{item.label}}
                                        </tag>
                                    </template>
                                </popover>
                            </div>
                        </template>
                    </template>
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
                <div :style="containerStyle">
                    <select-menu
                        :option-list="optionList"
                        :select-values="selectValues"
                        @change-select="changeSelect"
                        :style="menuStyle"
                    />
                </div>
            </template>
        </Popover>
    </div>
</template>
<style lang="stylus" scoped src="../style/select.styl"></style>