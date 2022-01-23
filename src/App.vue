<template>
    <div>
        <XTopTest />
        <XButtonTest />
        <XButtonGroupTest />
        <XMessageTest />
        <XLoadTest />
    </div>
</template>
<script lang="ts">
import XTopTest from "../packages/components/XTop/__tests__/XTop.test.vue";
import XButtonTest from "../packages/components/XButton/__tests__/XButtonTest.vue";
import XButtonGroupTest from "../packages/components/XButtonGroup/__tests__/XButtonGroupTest.vue";
import XMessageTest from "../packages/components/XMessage/__tests__/XMessageTest.vue";
import XLoadTest from "../packages/components/XLoad/__tests__/XLoadTest.vue";

export default {
    name: "App",
    components: {
        XTopTest,
        XButtonTest,
        XButtonGroupTest,
        XMessageTest,
        XLoadTest,
    },
};
</script>
