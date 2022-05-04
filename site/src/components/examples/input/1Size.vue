<script lang="ts" setup>
import { ref } from "vue";

let small = ref("");
let normal = ref("");
let large = ref("");
</script>
<template>
    <x-input placeholder="小" type="text" size="small" v-model="small" />
    <div class="split"></div>
    <x-input placeholder="中" type="text" size="normal" v-model="normal" />
    <div class="split"></div>
    <x-input placeholder="大" type="text" size="large" v-model="large" />
</template>