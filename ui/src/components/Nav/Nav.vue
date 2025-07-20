<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/AuthStore'
import { storeToRefs } from 'pinia'

const store = useAuthStore()
const { loggedIn } = storeToRefs(store)
</script>

<template>
  <nav>
    <ul>
      <li><RouterLink to="/">Home</RouterLink></li>
      <li><RouterLink to="/upload">Upload</RouterLink></li>
      <li v-if="loggedIn"><RouterLink to="/history">History</RouterLink></li>
      <li v-if="!loggedIn"><RouterLink to="/auth">Sign Up</RouterLink></li>
      <li v-if="loggedIn"><RouterLink to="/profile">Profile</RouterLink></li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
nav {
  margin-top: 1rem;
  background: $background-color;
  padding: 1rem;
  margin-bottom: 2rem;
  border-radius: 4px;
  width: 33%;
}
ul {
  display: flex;
  list-style: none;
  justify-content: space-evenly;
  display: flex;
  gap: 3rem;
  margin: 0;
  padding: 0;
}

a {
  color: #fff;
  text-decoration: none;
  font-weight: 500;
}

a.router-link-exact-active {
  color: rgb(182, 182, 255);
}
</style>
