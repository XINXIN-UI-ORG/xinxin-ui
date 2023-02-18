<script lang="ts" setup>
import { generateClassName } from '@xinxin-ui/utils';
import { onMounted, ref } from 'vue';
import { alertProps } from './alert';

const gcn = generateClassName('alert');
const props = defineProps(alertProps);

const simpleShow = ref<boolean>(false);
onMounted(() => {
  simpleShow.value = true;

  setTimeout(() => {
    simpleShow.value = false;
  }, props.duration);
});
</script>
<template>
  <transition name="simple" @after-leave="$emit('destory')">
    <div
      v-show="simpleShow"
      :class="[
        gcn.base(),
        gcn.bm(props.type),
      ]"
    >
      {{ props.message }}
    </div>
  </transition>
</template>
<style lang="stylus" scoped src="../style/simple.styl"></style>