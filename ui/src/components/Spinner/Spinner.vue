<script setup lang="ts">
defineProps<{ size?: number }>()
</script>

<template>
  <span class="loader" :style="{ width: `${size || 30}px`, height: `${size || 30}px` }"></span>
</template>

<style scoped>
.loader {
  border: 5px solid #fff;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
