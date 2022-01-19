<template>
  <div style="height: 2000px">
    <XTopTest />
    <XButtonTest />
    <XButtonGroupTest />
  </div>
</template>
<script lang="ts">
import XTopTest from "../packages/components/XTop/__tests__/XTop.test.vue";
import XButtonTest from "../packages/components/XButton/__tests__/XButtonTest.vue";
import XButtonGroupTest from "../packages/components/XButtonGroup/__tests__/XButtonGroupTest.vue";

export default {
    name: "App",
    components: {
      XTopTest,
      XButtonTest,
      XButtonGroupTest,
    }
}
</script>
