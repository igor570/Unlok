<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const id = route.query.id

const shareableLink = computed(() =>
  id ? `www.unlok.com/download/${id}` : 'No id found for message',
)
</script>

<template>
  <h1>Your encrypted message has been created</h1>
  <h2>Feel free to share the message with the link below</h2>
  <div class="message-wrapper">
    <div class="message-link">{{ shareableLink }}</div>
    <button class="message-copy-button">Copy</button>
  </div>
</template>

<style scoped>
h1,
h2 {
  color: white;
  font-weight: 400;
}

.message-wrapper {
  display: flex;
}

.message-copy-button {
  border-radius: 0;
  outline: none;
  border: none;
}

.message-link {
  flex: 1;
  height: 20px;
  padding: 4px;
  background-color: white;
  border: 1px solid grey;
  border-radius: 2px;
}
</style>
