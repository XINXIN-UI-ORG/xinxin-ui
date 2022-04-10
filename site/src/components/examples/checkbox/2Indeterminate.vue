<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        let checkValue = ref<boolean>(false);
        let indeterminateValue = ref<boolean>(false);
        return {
            checkValue,
            indeterminateValue,
            selectCheckBox() {
                checkValue.value = !checkValue.value;
            },
            indeterminateCheckbox() {
                indeterminateValue.value = !indeterminateValue.value;
            }
        };
    },
})
</script>
<template>
    <div class="show">
        <x-checkbox
            v-model:checked="checkValue"
            :indeterminate="indeterminateValue"
        />
        &nbsp;&nbsp;
        <x-button
            size="small"
            ghost
            type="warning"
            @click="selectCheckBox"
        >
            选中
        </x-button>
        <x-button
            size="small"
            ghost
            type="warning"
            @click="indeterminateCheckbox"
        >
            部分选中
        </x-button>
    </div>
</template>
<style scoped>
.show {
    display: flex;
    align-items: center;
}
.show :deep(.x-button) {
    margin-top: 0;
}
</style>