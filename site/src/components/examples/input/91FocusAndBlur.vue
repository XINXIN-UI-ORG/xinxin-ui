<script lang="ts">
import { defineComponent } from "vue";
import { XMessage } from "xinxin-ui";

export default defineComponent({
    setup() {
        return {
            inputBlur(value: string) {
                XMessage("blur触发，input框的内容为：" + value);
            },
            inputFocus(value: string) {
                XMessage("focus触发，input框的内容为：" + value);
            },
        };
    },
})
</script>
<template>
    <x-input placeholder="触发focus&blur" @onInputBlur="inputBlur" @onInputFocus="inputFocus" />
</template>