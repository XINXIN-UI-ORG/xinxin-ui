<template>
  <div style="height: 2000px">
    <XTop />
    <XButtonTest />
  </div>
</template>
<script lang="ts">
import XTop from "../packages/components/XTop/__tests__/XTop.test.vue";
import XButtonTest from "../packages/components/XButton/__tests__/XButtonTest.vue";

export default {
    name: "App",
    components: { XTop, XButtonTest }
}
</script>
