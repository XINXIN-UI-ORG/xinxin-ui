<script lang="ts">
import { defineComponent } from "vue";
import { tagProps } from "./tag";

export default defineComponent({
    name: "x-tag",
    props: tagProps,
    setup() {

    },
});
</script>
<template>
    tag111 {{type}}
</template>