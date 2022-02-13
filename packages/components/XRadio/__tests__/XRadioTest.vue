<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        return {
            r1: ref("1"),
        };
    },
});
</script>
<template>
    <div style="border: 1px solid #aaa; padding: 10px; margin-top: 10px">
        <p>单选框：</p>
        <p>
            <x-radio v-model="r1" value="1" name="r1" />
            <x-radio v-model="r1" value="2" name="r1" />
            &nbsp;
            {{r1}}
        </p>
    </div>
</template>
