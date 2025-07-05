<script setup lang="ts"></script>

<template>
  <section class="profile-page">
    <div class="profile">
      <img class="profile-photo" src="../assets/Corgi.jpg" />
      <div class="profile-name">Eszter P.</div>
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
  align-items: center;
  gap: 1rem;
  background-color: #222;
  padding: 24px;
  border-radius: 0.5rem;
}

.profile-name {
  color: white;
  font-size: 24px;
}

.profile-photo {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 100%;
  border: 1px solid white;
  display: block;
}
</style>
