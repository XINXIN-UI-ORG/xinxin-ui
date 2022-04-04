<template>
    <div class="layout">
        <div class="left">
            <slot name="left"></slot>
        </div>
        <div class="right">
            <slot name="right"></slot>
        </div>
    </div>
</template>
<style lang="stylus" scoped>
.layout
    .left
        float left
        width 49.5%
    .right
        float right
        width 49.5%
    &::after
        content ''
        display block
        clear both
@media (max-width: 1000px)
    .layout
        .left
            width 100%
        .right
            width 100%
</style>