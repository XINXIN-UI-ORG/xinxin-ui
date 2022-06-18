<template>
    <x-number-input
        placeholder="数字输入"
        number-button
        clearable
        step="2"
    />
    <div class="split"></div>
    <x-number-input
        placeholder="数字输入"
        number-button
        clearable
        :step="3"
    />
</template>