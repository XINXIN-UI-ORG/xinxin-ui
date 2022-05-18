<script lang="ts">
import { defineComponent, ref } from "vue";
import { SelectTypeEnum } from "./select";
import { generateClassName } from "@xinxin-ui/utils";
import { selectItemProps, useSelectItem, selectItemEmits } from "./selectItem";
import { Checked } from "@xinxin-ui/xinxin-icons";

export default defineComponent({
    props: selectItemProps,
    emits: selectItemEmits,
    setup(props, { emit }) {
        let selectItemRef = ref<HTMLDivElement>();
        let gcn = generateClassName("select");
        let { selectItemClick } = useSelectItem(emit, selectItemRef, props);

        return {
            selectItemRef,
            SelectTypeEnum,
            gcn,
            selectItemClick,
        };
    },
    components: {
        Checked,
    },
});
</script>
<template>
    <div ref="selectItemRef">
        <div
            v-if="data!.type === SelectTypeEnum.GROUP"
            :class="[
                gcn.e('options', 'group'),
            ]"
        >
            {{ data!.label }}
        </div>
        <div
            v-else
            :class="[
                gcn.e('options', 'item'),
                gcn.middle('options', 'item').is('selected', selectValues.indexOf(data!.value) !== -1 && !data!.disabled),
                gcn.middle('options', 'item').is('disabled', !!data!.disabled),
            ]"
            @click="selectItemClick($event, data!.value, !!data!.disabled)"
        >
            <div :class="[
                gcn.e('options', 'item', 'select'),
            ]">
                <checked v-if="selectValues.length > 0" />
            </div>
            <div :class="[
                gcn.e('options', 'item', 'label'),
            ]">
                {{ data!.label }}
            </div>
        </div>
    </div>
</template>
<style scoped lang="stylus" src="../style/selectItem.styl" />