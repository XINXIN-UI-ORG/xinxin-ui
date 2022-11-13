<script lang="ts">
import { defineComponent } from 'vue';
import { uploadProps } from './upload';

export default defineComponent({
    name: 'x-upload',
    props: uploadProps,
    setup() {

    },
});
</script>
<template>
    <div>
        upload works!、
    </div>
</template>