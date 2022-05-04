<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    setup() {
        return {
            value: ref("1"),
            options: [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
],

            value1: ref([])
        };
    },
})
</script>
<template>
    <x-select
        :options="options"
        placeholder="Select"
        v-model="value"
    >
    </x-select>

    <el-select
      v-model="value1"
      multiple
      placeholder="Select"
      style="width: 240px"
      filterable
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
</template>