<template>
    <x-popover
        content="禁闱秋夜，月探金窗罅。"
        theme="light"
    >
        <x-button ghost type="success">Light</x-button>
    </x-popover>
    <x-popover
        content="刷新"
        theme="dark"
    >
        <x-button ghost type="success">Dark</x-button>
    </x-popover>
    <x-popover
        content="谁家玉笛暗飞声，散入春风满洛城。"
        theme="customized"
    >
        <x-button ghost type="success">Customized</x-button>
    </x-popover>
</template>
<style>
.x-popover.x-popover-customized {
    background: linear-gradient(90deg, rgb(159, 229, 151), rgb(204, 229, 129));
}

.x-popover.x-popover-customized .x-popover__arrow::before {
    background: linear-gradient(45deg, #b2e68d, #bce689);
}
</style>