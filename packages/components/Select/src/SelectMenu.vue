<script lang="ts">
import { defineComponent } from "vue";
import { selectMenuProps, useSelectMenu, selectMenuEmits } from "./selectMenu";
import { SelectTypeEnum } from "./select";
import { generateClassName } from "@xinxin-ui/utils";
import { Checked, NoData } from "@xinxin-ui/xinxin-icons";

export default defineComponent({
    props: selectMenuProps,
    emits: selectMenuEmits,
    setup(_, { emit }) {
        let gcn = generateClassName("select");
        let { selectItemClick }  = useSelectMenu(emit);
        return {
            gcn,
            stopBlur(e: Event) {
                e.preventDefault();
                return false;
            },
            selectItemClick,
            SelectTypeEnum,
        };
    },
    components: {
        Checked,
        NoData,
    },
});
</script>
<template>
    <div
        :class="[
            gcn.e('options'),
        ]"
        @mousedown="stopBlur"
        @mouseup="stopBlur"
        @click.stop
        v-if="optionList.length > 0"
    >
        <template
            v-for="item in optionList"
            :key="item.value"
        >
            <div
                v-if="item.type === SelectTypeEnum.GROUP"
                :class="[
                    gcn.e('options', 'group'),
                ]"
            >
                {{item.label}}
            </div>
            <div
                v-else
                :class="[
                    gcn.e('options', 'item'),
                    gcn.middle('options', 'item').is('selected', selectValues.indexOf(item.value) !== -1 && !item.disabled),
                    gcn.middle('options', 'item').is('disabled', !!item.disabled),
                ]"
                @click="selectItemClick($event, item.value, !!item.disabled)"
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
        </template>
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
<style scoped lang="stylus" src="../style/selectMenu.styl" />