<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    setup() {
        return {
            options: [
                {
                    label: "rrrrrrrrr"
                },
                {
                    label: "ppppppppp"
                },
                {
                    label: "cccccccc"
                }
            ],
        };
    },
})
</script>
<template>
    <x-select :options="options"></x-select>
</template>