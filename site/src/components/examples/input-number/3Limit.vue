<template>
    <x-number-input
        placeholder="最大限制6"
        number-button
        clearable
        :max="6"
    />
    <div class="split"></div>
    <x-number-input
        placeholder="最小限制1"
        number-button
        clearable
        :min="1"
    />
    <div class="split"></div>
    <x-number-input
        placeholder="最大6最小1"
        number-button
        clearable
        :max="6"
        :min="1"
    />
</template>