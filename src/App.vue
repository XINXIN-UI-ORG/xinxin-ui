<template>
    <div style="padding-bottom: 300px">
        <XTopTest />
        <XButtonTest />
        <XButtonGroupTest />
        <XMessageTest />
        <XLoadTest />
        <XInputTest />
        <XNumberInputTest />
    </div>
</template>
<script lang="ts">
import XTopTest from "../packages/components/XTop/__tests__/XTop.test.vue";
import XButtonTest from "../packages/components/XButton/__tests__/XButtonTest.vue";
import XButtonGroupTest from "../packages/components/XButtonGroup/__tests__/XButtonGroupTest.vue";
import XMessageTest from "../packages/components/XMessage/__tests__/XMessageTest.vue";
import XLoadTest from "../packages/components/XLoad/__tests__/XLoadTest.vue";
import XInputTest from "../packages/components/XInput/__tests__/XInputTest.vue";
import XNumberInputTest from "../packages/components/XNumberInput/__tests__/XNumberInputTest.vue";

export default {
    name: "App",
    components: {
        XTopTest,
        XButtonTest,
        XButtonGroupTest,
        XMessageTest,
        XLoadTest,
        XInputTest,
        XNumberInputTest,
    },
};
</script>
