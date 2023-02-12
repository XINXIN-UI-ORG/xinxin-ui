<script lang="ts" setup>
import { generateClassName } from '@xinxin-ui/utils';
import { defineProps, onMounted, ref } from 'vue';
import { alertProps } from './alert';
import { Alert } from '@xinxin-ui/xinxin-icons';

const gcn = generateClassName('alert');
const props = defineProps(alertProps);
const showAlert = ref<boolean>(true);
</script>
<template>
  <div
    v-if="showAlert"
    :class="[
      gcn.base(),
      gcn.bm(props.type),
    ]"
  >
    <div :class="gcn.e('box')">
      <div :class="gcn.e('box', 'flag')"></div>
      <div :class="gcn.e('box', 'content')">
        <Alert class="icon" />
        <div class="text">
          <span class="text-content">{{ message }}</span>
          <span class="tips">{{ type.toUpperCase() }}</span>
        </div>
        <Alert class="icon" />
      </div>
      <div :class="gcn.e('box', 'flag')"></div>
    </div>
  </div>
</template>
<style lang="stylus" src="../style/alert.styl"></style>