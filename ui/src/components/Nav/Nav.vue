<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/AuthStore'
import { storeToRefs } from 'pinia'

const store = useAuthStore()
const { signedIn } = storeToRefs(store)
</script>

<template>
  <nav>
    <ul>
      <li><RouterLink to="/upload">Upload</RouterLink></li>
      <li v-if="signedIn"><RouterLink to="/history">History</RouterLink></li>
      <li><RouterLink to="/auth">Sign Up</RouterLink></li>
      <li v-if="signedIn"><RouterLink to="/profile">Profile</RouterLink></li>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  background: #222;
  padding: 1rem;
}
ul {
  display: flex;
  list-style: none;
  justify-content: space-evenly;
  display: flex;
  gap: 1.5rem;
  margin: 0;
  padding: 0;
}

a {
  color: #fff;
  text-decoration: none;
  font-weight: 500;
}
a.router-link-exact-active {
  text-decoration: underline;
}
</style>
