<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        let loading = ref<boolean>(false);

        return {
            value: ref<boolean>(false),
            value2: ref<boolean>(false),
            loading,
            beforeChange() {
                loading.value = true;
                return new Promise(resolve => {
                    setTimeout(() => {
                        loading.value = false;
                        resolve(true);
                    }, 2000);
                });
            },
        };
    },
});
</script>
<template>
    <x-switch
        v-model="value"
        loading
    >
    </x-switch>
    &nbsp;
    <x-switch
        v-model="value2"
        :loading="loading"
        :before-change="beforeChange"
    >
    </x-switch>
</template>