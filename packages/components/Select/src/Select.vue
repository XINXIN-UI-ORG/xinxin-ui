<script lang="ts">
import { defineComponent } from 'vue';
import { generateClassName } from "@xinxin-ui/utils";
import { selectProps } from "./select";
import XInput from "../../XInput";
import Popover from "../../Popover";
import { Select } from "@xinxin-ui/xinxin-icons";

export default defineComponent({
    name: "x-select",
    props: selectProps,
    setup() {
        let gcn = generateClassName("select");
        return {
            gcn,
        };
    },
    components: {
        XInput,
        Select,
        Popover,
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
            :_extend-width="4"
        >
            <x-input
                :class="[
                    gcn.e('input'),
                ]"
                block
                _cursor
                readonly
            >
                <template #suffix>
                    <Select :class="[
                        gcn.e('input', 'icon'),
                    ]" />
                </template>
            </x-input>
            <template #content>
                dsfdsfsd
            </template>
        </Popover>
    </div>
</template>
<style lang="stylus" scoped src="../style/select.styl"></style>