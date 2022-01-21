<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
    },
})
</script>
<template>
    <div style="border: 1px solid #aaa; padding: 10px; margin-top: 10px;">
        <p>按钮组：</p>
        <p>
            <x-button-group>
                <x-button />
                <x-button type="success" />
                <x-button />
            </x-button-group>
            &nbsp;&nbsp;
            <x-button-group direction="vertical">
                <x-button />
                <x-button type="warning" />
                <x-button />
            </x-button-group>
            &nbsp;&nbsp;
            <x-button-group>
                <x-button round />
                <x-button type="success" />
                <x-button />
            </x-button-group>
            &nbsp;&nbsp;
            <x-button-group direction="vertical">
                <x-button round />
                <x-button type="warning" />
                <x-button round />
            </x-button-group>
            &nbsp;&nbsp;
            <x-button-group>
                <x-button ghost />
                <x-button ghost />
                <x-button ghost />
                <x-button ghost />
                <x-button ghost type="success" />
                <x-button ghost round />
            </x-button-group>
            &nbsp;&nbsp;
            <x-button-group direction="vertical">
                <x-button ghost />
                <x-button ghost />
                <x-button ghost />
                <x-button ghost />
                <x-button ghost type="success" />
                <x-button ghost round />
            </x-button-group>
        </p>
    </div>
</template>
