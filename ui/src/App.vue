<script setup lang="ts">
import { Nav } from '@/components'
</script>

<template>
  <div class="app-bg">
    <Nav />
    <router-view />
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
}
.app-bg {
  min-height: 100vh;
  min-width: 1280px;
  display: flex;
  flex-direction: column;
  background: #1a1a1a;
}
</style>
