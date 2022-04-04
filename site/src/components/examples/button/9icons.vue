<script lang="ts">
import { defineComponent } from "vue";
import { AuthSuccess, Search, Auth, Top, Refresh } from "@xinxin-ui/xinxin-icons";

export default defineComponent({
    setup() {
        
    },
    components: {
        AuthSuccess,
        Search,
        Auth,
        Top,
        Refresh
    }
})
</script>
<template>
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
</template>