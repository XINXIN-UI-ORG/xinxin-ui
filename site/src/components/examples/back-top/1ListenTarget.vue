<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        return {
            topRef: ref(null),
        };
    },
});
</script>
<template>
    <h3>传入ref对象:</h3>
    <div style="height: 50px; border: 1px solid #eee; overflow: auto; padding-left: 10px"
         ref="topRef">
        <p>传入ref对象</p>
        <p>传入ref对象</p>
        <p>传入ref对象</p>
        <p>传入ref对象</p>
        <p>传入ref对象</p>
        <p>传入ref对象</p>
        <p>传入ref对象</p>
        <p>传入ref对象</p>
        <p>传入ref对象</p>
        <p>传入ref对象</p>
        <p>传入ref对象</p>
        <p>传入ref对象</p>
        <p>传入ref对象</p>
        <p>传入ref对象</p>
        <p>传入ref对象</p>
        <p>传入ref对象</p>
    </div>
    <x-top :listen-element="topRef" bottom="32rem" />
    <h3>传入类名:</h3>
    <div class="top-ref"
         style="height: 50px; border: 1px solid #eee; overflow: auto; padding-left: 10px">
        <p>传入类名</p>
        <p>传入类名</p>
        <p>传入类名</p>
        <p>传入类名</p>
        <p>传入类名</p>
        <p>传入类名</p>
        <p>传入类名</p>
        <p>传入类名</p>
        <p>传入类名</p>
        <p>传入类名</p>
        <p>传入类名</p>
        <p>传入类名</p>
        <p>传入类名</p>
        <p>传入类名</p>
        <p>传入类名</p>
    </div>
    <x-top listen-element=".top-ref" bottom="28rem" />
</template>
