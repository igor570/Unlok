<script setup lang="ts">
import { useAuthStore } from '@/stores'
import corgiImg from '../assets/Corgi.jpg'
import { storeToRefs } from 'pinia'

const store = useAuthStore()
const { logout } = store
const { user } = storeToRefs(store)
</script>

<template>
  <section class="profile-page">
    <div class="profile">
      <div class="profile-info">
        <img class="profile-photo" :src="user?.profilePhoto ?? corgiImg" />
        <div class="profile-name">{{ user?.username }}</div>
      </div>
      <button @click="logout">Logout</button>
    </div>
  </section>
</template>

<style scoped lang="scss">
.profile-page {
  display: flex;
  height: 100vh;
  width: 100%;
}

.profile {
  width: 500px;
  height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  background-color: #222;
  padding: 24px;
  border-radius: 0.5rem;

  &-info {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  &-name {
    color: white;
    font-size: 24px;
  }

  &-photo {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 100%;
    border: 1px solid white;
    display: block;
  }
}
</style>
