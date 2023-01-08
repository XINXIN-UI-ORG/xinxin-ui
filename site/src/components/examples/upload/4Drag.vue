<script lang="ts" setup>
</script>
<template>
  <x-upload
    action="http://localhost:30000/api/uploadimg"
    method="POST"
    drag
  ></x-upload>
</template>