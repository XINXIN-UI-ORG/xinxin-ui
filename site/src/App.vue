<template>
  <router-view name="Nav"></router-view>
  <router-view v-slot="{ Component }">
    <keep-alive :max="10">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script>

export default {
  name: 'App'
}
</script>
