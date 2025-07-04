<script setup lang="ts"></script>

<template>
  <div class="app-bg">
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
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1a1a1a;
}
</style>
