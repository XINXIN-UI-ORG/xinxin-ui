<script lang="ts">
import { defineComponent, ref } from 'vue';
import { AuthSuccess, Search, Auth, Top, Refresh, WarningMessage } from "xinxin-icons";

export default defineComponent({
    setup() {
        let disabled = ref(true);
        return {
            disabled,
            disableChange() {
                disabled.value = !disabled.value;
            },
        };
    },
    components: {
        AuthSuccess,
        Search,
        Auth,
        Top,
        Refresh,
        WarningMessage
    },
})
</script>

<template>
    <div style="border: 1px solid #aaa; padding: 10px;">
        <p style="display: flex; justify-content: space-around;">
            <x-button>Default</x-button>
            <x-button type="info">Info</x-button>
            <x-button type="success">Success</x-button>
            <x-button type="warning">Warning</x-button>
            <x-button type="error">Error</x-button>

            <x-button secondary>Default</x-button>
            <x-button secondary type="info">Info</x-button>
            <x-button secondary type="success">Success</x-button>
            <x-button secondary type="warning">Warning</x-button>
            <x-button secondary type="error">Error</x-button>

            <x-button secondary tertiary>Default</x-button>
            <x-button tertiary type="info">Info</x-button>
            <x-button tertiary type="success">Success</x-button>
            <x-button tertiary type="warning">Warning</x-button>
            <x-button tertiary type="error">Error</x-button>

            <x-button secondary tertiary quaternary>Default</x-button>
            <x-button quaternary type="info">Info</x-button>
            <x-button quaternary type="success">Success</x-button>
            <x-button quaternary type="warning">Warning</x-button>
            <x-button quaternary type="error">Error</x-button>

            <x-button secondary tertiary quaternary dashed>Default</x-button>
            <x-button dashed type="info">Info</x-button>
            <x-button dashed type="success">Success</x-button>
            <x-button dashed type="warning">Warning</x-button>
            <x-button dashed type="error">Error</x-button>
        </p>
        <p style="display: flex; justify-content: space-around;">
            <x-button plain>Default</x-button>
            <x-button plain type="info">Info</x-button>
            <x-button plain type="success">Success</x-button>
            <x-button plain type="warning">Warning</x-button>
            <x-button plain type="error">Error</x-button>

            <x-button round>Default</x-button>
            <x-button round type="info">Info</x-button>
            <x-button round type="success">Success</x-button>
            <x-button round type="warning">Warning</x-button>
            <x-button round type="error">Error</x-button>

            <x-button circle>D</x-button>
            <x-button circle type="info">I</x-button>
            <x-button circle type="success">S</x-button>
            <x-button circle type="warning">W</x-button>
            <x-button circle type="error">E</x-button>

            <x-button ghost>Default</x-button>
            <x-button ghost type="info">Info</x-button>
            <x-button ghost type="success">Success</x-button>
            <x-button ghost type="warning">Warning</x-button>
            <x-button ghost type="error">Error</x-button>

            <x-button>
                <template #pre-icon>
                    <AuthSuccess />
                </template>
                Default
            </x-button>
            <x-button type="info">
                <template #pre-icon>
                    <Search />
                </template>
                Info
            </x-button>
            <x-button type="success">
                <template #suf-icon>
                    <Auth />
                </template>
                Success
            </x-button>
            <x-button type="warning">
                <template #pre-icon>
                    <Top />
                </template>
                Warning
            </x-button>
            <x-button type="error">
                <template #pre-icon>
                    <Refresh />
                </template>
                Error
            </x-button>
        </p>
        <p style="display: flex; justify-content: space-around;">
            <x-button circle>
                <AuthSuccess />
            </x-button>
            <x-button type="info" circle>
                <Search />
            </x-button>
            <x-button type="success" circle>
                <Auth />
            </x-button>
            <x-button type="warning" circle>
                <Top />
            </x-button>
            <x-button type="error" circle>
                <Refresh />
            </x-button>

            <x-button type="error" size="mini">Error</x-button>
            <x-button type="info" size="small">Info</x-button>
            <x-button type="success" size="normal">Success</x-button>
            <x-button type="warning" size="large">Warning</x-button>
            <x-button type="warning" size="large" circle>Warning</x-button>

            <x-button type="info" disabled>Info</x-button>
            <x-button type="success" :disabled="disabled">Success</x-button>
            <x-button type="warning" :disabled="disabled">Warning</x-button>
            <x-button type="error" :disabled="disabled">Error</x-button>
            <x-button @click="disableChange">切换禁用</x-button>

            <x-button type="info" loading>
                <template #pre-icon>
                    <Refresh />
                </template>
                Info
            </x-button>
            <x-button type="success" :loading="disabled">
                <template #pre-icon>
                    <Refresh />
                </template>
                Success
            </x-button>
            <x-button type="warning" :loading="disabled">
                <template #pre-icon>
                    <Refresh />
                </template>
                Warning
            </x-button>
            <x-button type="error" :loading="disabled">
                <template #pre-icon>
                    <Refresh />
                </template>
                Error
            </x-button>
        </p>
    </div>
</template>

