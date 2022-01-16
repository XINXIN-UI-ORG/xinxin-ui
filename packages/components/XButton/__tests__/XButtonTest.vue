<script lang="ts">
import { defineComponent } from 'vue';
import { authSuccess, search, auth, top, refresh, warningMessage } from "xinxin-icons";

export default defineComponent({
    setup() {
    },
    components: {
        authSuccess,
        search,
        auth,
        top,
        refresh,
        warningMessage
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
                <authSuccess />
                Default
            </x-button>
            <x-button type="info">
                <search />
                Info
            </x-button>
            <x-button type="success">
                <auth />
                Success
            </x-button>
            <x-button type="warning">
                <top />
                Warning
            </x-button>
            <x-button type="error">
                <refresh />
                Error
            </x-button>
        </p>
        <p style="display: flex; justify-content: space-around;">
            <x-button circle>
                <authSuccess />
            </x-button>
            <x-button type="info" circle>
                <search />
            </x-button>
            <x-button type="success" circle>
                <auth />
            </x-button>
            <x-button type="warning" circle>
                <top />
            </x-button>
            <x-button type="error" circle>
                <refresh />
            </x-button>
        </p>
    </div>
</template>
