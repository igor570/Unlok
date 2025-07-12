<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.query.id

const shareableLink = computed(() =>
  id ? `www.unlok.com/download/${id}` : 'No id found for message',
)

const { copy, copied, isSupported } = useClipboard()
</script>

<template>
  <h1>Your encrypted message has been created</h1>
  <h2>Feel free to share the message with the link below</h2>
  <div class="message-wrapper">
    <div class="message-link">{{ shareableLink }}</div>
    <div v-if="isSupported">
      <button class="message-copy-button" @click="copy(shareableLink)">
        <span v-if="!copied">Copy</span>
        <span v-else>Copied!</span>
      </button>
    </div>
    <p v-else>Your browser does not support Clipboard API</p>
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
  align-items: center;
  gap: 5px;
}

.message-copy-button {
  border-radius: 0;
  outline: none;
  border: none;
  height: 100%;
  padding: 4px 12px;
  background: #6366f1;
  color: #fff;
  cursor: pointer;
}

.message-link {
  flex: 1;
  height: 20px;
  padding: 2px;
  background-color: white;
  border: 1px solid grey;
  border-radius: 2px;
}
</style>
